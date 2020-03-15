const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Channel = require('../models/Channel');

//wrap routes in function that takes Socket.IO server as an arg

const commentRouter = io => {
  //function that emits comment events to client
  const sendCommentToClient = (event, comment, channelID = '') => {
    const { date, _id, text, isEdited } = comment;
    const toSend = {
      _id,
      text,
      date,
      isEdited,
      ...(comment.user ? { user: comment.user.name } : { user: 'Deleted User' }),
      ...(comment.user ? { user_id: comment.user._id } : { user_id: null }),
      ...(comment.user ? { userImage: comment.user.userImage } : { userImage: null }),
    };

    if (channelID) {
      io.sockets.to(channelID).emit(event, toSend);
    } else {
      io.sockets.emit(event, toSend);
      console.log('thread');
    }
  };

  const deleteCommentFromClient = (channelID, commentID) => {
    io.sockets.to(channelID).emit('delete', commentID);
  };

  /*
Route GET requests at root 
Populate comment document with user document referenced in "user" field
return response containing array of all comments in JSON on success
*/

  router.get('/', (req, res) => {
    Comment.find({ threadedComment: false })
      .populate(['user', 'threadedComments', { path: 'threadedComments', populate: 'user' }])
      .then(comments => {
        const serializeComment = eachComment => ({
          _id: eachComment._id,
          text: eachComment.text,
          date: eachComment.date,
          isEdited: eachComment.isEdited,
          ...(eachComment.user ? { user: eachComment.user.name } : { user: 'Deleted User' }),
          ...(eachComment.user ? { user_id: eachComment.user._id } : { user_id: null }),
          ...(eachComment.user ? { userImage: eachComment.user.userImage } : { userImage: null }),
          ...(eachComment.threadedComments.length > 0
            ? { thread: eachComment.threadedComments.map(serializeComment) }
            : null),
        });

        res.json(comments.map(serializeComment));
      })
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

      const { user, text, date, threadedComment, parentID, channelID } = req.body;

      User.findById(user)
        .then(user => {
          if (user) {
            if (threadedComment) {
              if (!parentID) {
                return res.status(400).json({ Error: 'Parent comment ID not supplied' });
              }

              Comment.findById(parentID).then(parent => {
                if (parent.threadedComment) {
                  return res.status(400).json({ Error: 'You can not create a thread on a thread' });
                }

                Comment.create({
                  user: user._id,
                  text,
                  date,
                  threadedComment,
                })
                  .then(comment => {
                    const { date, _id, text } = comment;
                    parent.threadedComments.push(_id);
                    parent.save();
                    res.status(201).json({
                      date,
                      _id,
                      text,
                      user: user.name,
                      userImage: user.userImage,
                    });
                    return comment;
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'Something went wrong' });
                  });
              });
            } else {
              Channel.findById(channelID)
                .then(channel => {
                  if (!channel) {
                    return res.status(404).json({ Error: 'Channel not found' });
                  }

                  Comment.create({
                    user: user._id,
                    text,
                    date,
                  })
                    .then(comment => {
                      const { date, _id, text } = comment;

                      channel.comments.push(_id);
                      channel.save();
                      res.status(201).json({
                        date,
                        _id,
                        text,
                        user: user.name,
                        channelID,
                      });

                      return comment;
                    })
                    .then(comment => {
                      return Comment.populate(comment, { path: 'user' });
                    })
                    .then(comment => {
                      sendCommentToClient('post', comment, channelID);
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({ message: 'Something went wrong' });
                    });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({ message: 'Something went wrong' });
                });
            }
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
  router.delete('/:channelID?/:commentID', (req, res) => {
    Comment.findById(req.params.commentID)
      .then(comment => {
        if (!comment) {
          return res.status(404).json({ Error: 'Comment not found' });
        }

        if (req.user._id !== comment.user.toString()) {
          return res.status(403).json({ message: "This isn't your comment" });
        }

        comment
          .remove()
          .then(() => res.status(204).end())
          .then(
            //emit delete event to all connected sockets
            deleteCommentFromClient(req.params.channelID, req.params.commentID),
          );
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
    const { text: textToUpdate, channelID } = req.body;
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
        comment.isEdited = true;

        comment
          .save()
          .then(comment => {
            const { text, date } = comment;
            res.status(201).json({
              text,
              date,
              user: name,
              channelID,
            });

            return comment;
          })
          .then(comment => {
            return Comment.populate(comment, { path: 'user' });
          })
          .then(comment => {
            sendCommentToClient('edit', comment, channelID);
          });
      })
      .catch(err => res.status(500).json('Something went wrong'));
  });

  return router;
};
module.exports = commentRouter;
