const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const User = require("../models/User");
const mongoose = require("mongoose");

//Comment Routes

/*
Route GET requests at root 
return response containing all comments in JSON on success
*/
router.get("/", function(req, res) {
  Comment.find()
    .lean()
    .exec(function(err, comments) {
      if (err) {
        {
          return res.status(500).send(err);
        }
      } else {
        return res.json(comments);
      }
    });
});

/*
Route Post requests 
Validate request body
Verify userID exists in db
Create new comment document from request body
Populate username of comment document
Return response containing new comment in JSON
*/

router.post(
  "/",
  [
    body("userID", "invalid userID").isLength({
      min: 24
    }),
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

    const { userID, text, date } = req.body;

    const _id = new mongoose.Types.ObjectId(userID);

    try {
      const user = await User.findOne({ _id });
      if (!user) {
        return res.status(404).json({ error: "No user Found" });
      }

      let new_comment = await Comment.create({
        userID,
        text,
        date
      });

      new_comment = await new_comment
        .populate("username", userID.username)
        .execPopulate();

      return res.json(new_comment);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

/*
Route DELETE requests 
Create mongoose ObjectId from parameter
Find and delete comment in db using findByIdAndDelete()
Return confirmation message on success
*/
router.delete("/:commentID", (req, res) => {
  const commentID = new mongoose.Types.ObjectId(req.params.commentID);

  Comment.findByIdAndDelete(commentID).exec(function(err) {
    if (err) {
      return res.status(404).send(err);
    } else {
      return res.send("comment deleted");
    }
  });
});

/*
Route PUT requests 
Create mongoose ObjectId from parameter
Find and update comment in db using findByIdAndUpdate()
Return response containing updated comment in JSON on succes
*/
router.put("/:commentID", (req, res) => {
  const commentID = new mongoose.Types.ObjectId(req.params.commentID);
  const { text } = req.body;

  Comment.findByIdAndUpdate(
    commentID,
    { text },
    { upsert: true, new: true }
  ).exec(function(err, comment) {
    if (err) {
      return res.status(404).json(req.body);
    } else {
      return res.json(comment);
    }
  });
});

module.exports = router;
