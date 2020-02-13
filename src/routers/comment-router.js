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
    $or: [{ userID: userID }, { text: text }, { date: date }]
  })
    .lean()
    .exec(function(err, comments) {
      if (err) {
        {
          res.status(500).send(err);
        }
      } else {
        res.send(JSON.stringify(comments));
      }
    });
});

/*
Routes Post requests at "/create" 
Creates new comment document from request body
Populates username of comment document
Sends JSON of comment back in response 
*/

router.post("/create", async function(req, res) {
  const { userID, text, date } = req.body;

  let new_comment = await Comment.create(
    {
      "userID": userID,
      "text": text,
      "date": date
    },
    function(err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );

   new_comment.populate("username", userID.username)
    .execPopulate(function(err, comment) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(JSON.stringify(comment));
      }
    });
});

/*
Routes DELETE requests at "/delete" 
Takes request body and saves it as a comment in the database
Populates username field once saved
*/
router.delete("/delete", function(req, res) {
  const { _id } = req.body;

  Comment.findByIdAndDelete({ _id: _id }).exec(function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("comment deleted");
    }
  });
});

/*Routes PUT requests at "/edit".
Receives an updated comment in request and updates comment in db
Sends updated comment in response
*/
router.put("/edit", function(req, res) {
  const { _id, text } = req.body;

  Comment.findByIdAndUpdate(_id, { text: text }).exec(function(err, comment) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(JSON.stringify(comment));
    }
  });
});
