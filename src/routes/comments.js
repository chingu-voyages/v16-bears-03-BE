const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const User = require('../models/User');

/*
Route GET requests at root 
Populate comment document with user document referenced in "user" field
return response containing array of all comments in JSON on success
*/
router.get('/', (req, res) => {
  Comment.find()
    .populate('user')
    .then(comments =>
      res.json(
        comments.map(comment => {
          const { _id, text, date } = comment;
          return {
            _id,
            text,
            date,
            ...(comment.user ? { user: comment.user.name } : { user: 'Deleted User' }),
            ...(comment.user ? { user_id: comment.user._id } : { user_id: null }),
            ...(comment.user ? { userImage: comment.user.userImage } : { userImage: null }),
          };
        }),
      ),
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

/*
Route Post requests 
Validate request body
Verify userID exists in db
Create new comment document from request body
Return response containing new comment in JSON
*/

router.post(
  '/',
  [
    body('user', 'must provide user id')
      .not()
      .isEmpty(),
    body('text', 'Comment is empty')
      .not()
      .isEmpty(),
  ],

  (req, res) => {
    //express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!(req.user._id.toString() === req.body.user)) {
      return res
        .status(400)
        .json({ message: "User ID in body and user ID associated with token don't match" });
    }

    const { user, text, date } = req.body;

    User.findById(user)
      .then(user => {
        if (user) {
          Comment.create({
            user: user._id,
            text,
            date,
          })
            .then(comment => {
              const { date, _id, text } = comment;
              res.status(201).json({
                date,
                _id,
                text,
                user: user.name,
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ message: 'Something went wrong' });
            });
        } else {
          const message = 'User not found';
          console.log(message);
          return res.status(400).send(message);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
      });
  },
);

/*
Route DELETE requests 
Create mongoose ObjectId from parameter
Find and delete comment in db using findByIdAndDelete()
Return confirmation message on success
*/
router.delete('/:commentID', (req, res) => {
  Comment.findById(req.params.commentID)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ Error: 'Comment not found' });
      }

      if (req.user._id.toString() !== comment.user.toString()) {
        return res.status(403).json({ message: "This isn't your comment" });
      }

      comment.remove().then(() => res.status(204).end());
    })
    .catch(err => res.status(500).json('Something went wrong'));
});

/*
Route PATCH requests 
Create mongoose ObjectId from parameter
Find and update comment in db using findByIdAndUpdate()
Return response containing updated comment in JSON on succes
*/
router.patch('/:commentID', (req, res) => {
  const { text: textToUpdate } = req.body;
  const { name } = req.user;

  Comment.findById(req.params.commentID)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ Error: 'Comment not found' });
      }

      if (req.user._id !== comment.user.toString()) {
        return res.status(403).json({ message: "This isn't your comment" });
      }

      comment.text = textToUpdate;

      comment.save().then(comment => {
        const { text, date } = comment;
        res.status(201).json({
          text,
          date,
          user: name,
        });
      });
    })
    .catch(err => res.status(500).json('Something went wrong'));
});

module.exports = router;
