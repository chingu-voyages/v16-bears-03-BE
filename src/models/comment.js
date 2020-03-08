//Requires Mongoose
const mongoose = require('mongoose');
//Creates comment schema

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isEdited: { type: Boolean, default: false },
});

//Creates comment model to construct documents for our database
const Comment = mongoose.model('Comment', commentSchema);

//Exports model
module.exports = Comment;
