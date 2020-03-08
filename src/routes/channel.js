const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Channel = require('../models/Channel');

/**
 * @route POST api/channels
 * @access Public
 * @desc Create new channel
 */
router.post(
  '/',
  [
    check('name', 'Name of the channel is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    // express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, description, user, date } = req.body;

    try {
      let channelName = await Channel.findOne({ name });

      if (channelName) {
        return res.status(409).json({
          errors: [{ msg: `Channel with name '${channelName.name}' already exists!` }],
        });
      }

      const channel = await Channel.create({
        name,
        description: description ? description : 'This channel is without description',
        users: [user],
        comments: [],
        date,
      });

      return res.status(201).json(channel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

/**
 * @route GET api/channels
 * @access Public
 * @desc Get all channels
 */
router.get('/', async (req, res) => {
  try {
    let allChannels = await Channel.find().populate([
      'users',
      {
        path: 'comments',
        populate: ['user', 'threadedComments', { path: 'threadedComments', populate: 'user' }],
      },
    ]);

    if (allChannels) {
      const channels = allChannels.map(channel => {
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

        return {
          name: channel.name,
          description: channel.description,
          dateCreated: channel.date,
          id: channel._id,
          users: channel.users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
          })),
          comments: channel.comments.map(serializeComment),
        };
      });

      return res.status(200).send(channels);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
