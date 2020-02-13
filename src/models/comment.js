//Requires Mongoose
const mongoose = require("mongoose");

//Creates comment schema

const commentSchema = new mongoose.Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now()}
});

//Creates comment model to construct documents for our database
const Comment = mongoose.model("Comment", commentSchema);

//Exports model
module.exports = Comment;
