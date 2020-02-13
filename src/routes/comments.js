const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const comment_controller = require("../controllers/comment-controller");

//Comment Routes

/*
Routes GET requests at root 
returns a promise of a JSON object containing a list of comments
*/
router.get("/", function(req, res) {
  const { userID, username, text, date } = req.body;

  Comment.find({
    $or: [{ userID }, { username }, { text }, { date }]
  })
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
Routes Post requests at "/create" 
Verifies userID exists 
Creates new comment document from request body
Populates username of comment document
Sends JSON of comment back in response 
*/

router.post("/", async (req, res) => {
  const { userID, text, date } = req.body;

  const user = await User.findOne({ userID });

  
  if (!user) {
    return res.status(400).send("User does not exist");
  }

  let new_comment = await Comment.create(
    {
      userID,
      text,
      date
    },
    function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    }
  );

  new_comment = await new_comment
    .populate("username", userID.username)
    .execPopulate(function(err) {
      if (err) {
       return res.status(500).send(err);
      }
    });

  return res.json(new_comment);
  
    
  
});

/*
Routes DELETE requests at "/delete" 
Takes request body and saves it as a comment in the database
Populates username field once saved
*/
router.delete("/:commentID", (req, res) => {
  const { commentID } = req.params;

  Comment.findByIdAndDelete(commentID).exec(function(err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send("comment deleted");
    }
  });
});

/*Routes PUT requests at "/edit".
Receives an updated comment in request and updates comment in db
Sends updated comment in response
*/
router.put("/:commentID", (req, res) => {
  const { commentID } = req.params;
  const { text } = req.body;

  Comment.findByIdAndUpdate(commentID, { text }).exec(function(err, comment) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(comment);
    }
  });
});

export default router;
