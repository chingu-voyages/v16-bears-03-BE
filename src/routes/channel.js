const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Channel = require('../models/Channel');

/**
 * @route POST api/channels
 * @access Private
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
 * @access Private
 * @desc Get all channels
 */
router.get('/', async (req, res) => {
  try {
    await Channel.find()
      .populate('users')
      .exec((err, channels) => {
        channels.map(channel => {
          return {
            name: channel.name,
            description: channel.description,
            dateCreated: channel.date,
            id: channel._id,
            users: channel.users,
            comments: channel.comments,
          };
        });

        return res.status(200).send(channels);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

/**
 * @route POST api/channels
 * @access Private
 * @desc Add the new user to the General channel
 */
router.post(
  '/general',
  [
    check('users', 'User id is required')
      .not()
      .isEmpty(),
  ],
  (req, res) => {
    Channel.find({ name: 'General' })
      .then(generalChannel => {
        Channel.findById(generalChannel[0]._id).then(channel => {
          channel.users.push(req.body.users);

          channel.save().then(channel => {
            return res.status(200).send(`channel: ${channel}`);
          });
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
      });
  },
);

module.exports = router;
