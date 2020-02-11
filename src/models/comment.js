//Requires Mongoose
const mongoose = require("mongoose");

//Creates variables to store Schema

const Schema = mongoose.Schema;

//Creates comment schema

const commentSchema = Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  username: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  date: { type: Date, default: Date.now() },
  channel: String
});

//Creates comment model to construct documents for our database
const Comment = mongoose.model("Comment", commentSchema);

//Exports model
module.exports = Comment;
