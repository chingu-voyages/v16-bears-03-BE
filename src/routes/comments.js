const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const User = require("../models/users");

//Comment Routes

/*
Routes GET requests at root 
returns a promise of a JSON object containing all the comments
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
Routes Post requests 
Verifies userID exists 
Creates new comment document from request body
Populates username of comment document
Sends JSON of comment back in response 
*/

router.post(
  "/",
  [
    check("userID", "no userID")
      .not()
      .isEmpty(),
    check("text", "Comment is empty").not(),
    isEmpty()
  ],
  async (req, res) => {

    //express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, text, date } = req.body;

    const user = await User.findOne({ userID });

    try {
      if (!user) {
        return res.status(404).json({error: "No user Found"});
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
Routes DELETE requests 
Takes request body and saves it as a comment in the database
Populates username field once saved
*/
router.delete("/:commentID", (req, res) => {
  const { commentID } = req.params;

  Comment.findByIdAndDelete(commentID).exec(function(err) {
    if (err) {
      return res.status(404).send(err);
    } else {
      return res.send("comment deleted");
    }
  });
});

/*Routes PUT requests 
Receives an updated comment in request and updates comment in db
Sends updated comment in response
*/
router.put("/:commentID", (req, res) => {
  const { commentID } = req.params;
  const { text } = req.body;

  Comment.findByIdAndUpdate(commentID, { text }).exec(function(err, comment) {
    if (err) {
      return res.status(404).send(err);
    } else {
      return res.json(comment);
    }
  });
});

export default router;
