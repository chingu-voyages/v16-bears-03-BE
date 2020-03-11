const mongoose = require('mongoose');
const Comment = require('./Comment');

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Channel = mongoose.model('channel', ChannelSchema);
