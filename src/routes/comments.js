const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const User = require("../models/User");
const mongoose = require("mongoose");

//Comment Routes

/*
Route GET requests at root 
Populate comment document with user document referenced in "user" field
return response containing array of all comments in JSON on success
*/
router.get("/", async (req, res) => {
  Comment.find()
    .populate("user")
    .exec()
    .then(comments =>
      res.json(
        comments.map(comment => {
          return {
            _id: comment._id,
            user: comment.user._id,
            name: comment.user.name,
            text: comment.text,
            date: comment.date
          };
        })
      )
    )
    .catch(err => {
      res.status(500).json({ error: "Something went wrong" });
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
  "/",
  [
    body("user", "invalid userID")
      .not()
      .isEmpty(),
    body("text", "Comment is empty")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, text, date } = req.body;

    try {
      const _id = new mongoose.Types.ObjectId(user);

      await User.findById(_id);

      let new_comment = await Comment.create({
        user: _id,
        text,
        date
      });

      return res.json(new_comment);
    } catch (error) {
      return res.status(500).json({ error: "Something went Wrong" });
    }
  }
);

/*
Route DELETE requests 
Create mongoose ObjectId from parameter
Find and delete comment in db using findByIdAndDelete()
Return confirmation message on success
*/
router.delete("/:commentID", async (req, res) => {
  Comment.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.commentID))
    .then(deleted => {
      if (deleted) {
        res.json({ deleted: deleted });
      } else {
        return Promise.reject("Error: Comment not found");
      }
    })
    .catch(err => res.status(404).json(err));
});

/*
Route PUT requests 
Create mongoose ObjectId from parameter
Find and update comment in db using findByIdAndUpdate()
Return response containing updated comment in JSON on succes
*/
router.put("/:commentID", async (req, res) => {
  const { text } = req.body;

  Comment.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req.params.commentID),
    { text },
    { upsert: false, new: true }
  )
    .then(comment => res.json(comment))
    .catch(err => res.status(404).json({ error: "Something went wrong" }));
});

module.exports = router;
