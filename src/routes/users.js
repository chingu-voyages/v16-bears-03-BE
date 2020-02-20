const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

/**
 * @route POST api/users
 * @access Public
 * @desc Register users
 */
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please add a valid email').isEmail(),
    check('password', 'Please add a password with 6 or more characters').isLength({
      min: 6,
    }),
    //We shouldn't be sending back the attempted password I think
  ],
  async (req, res) => {
    // express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(409).json({
          errors: [{ msg: `User with email '${email}' already exists!` }],
        });
      }

      // this hashes the password
      password = await User.hashPassword(password);

      // .create() is a mongoose function that creates a new user and .save() it into the db
      user = await User.create({
        name,
        email,
        password,
      });

      res.status(201).json(user.serialize());
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
);

/**
 * @route GET api/users
 * @access Public
 * @desc Get all users
 */
router.get('/', jwtAuth, async (req, res) => {
  try {
    const allUsers = await User.find();
    let users;

    if (allUsers) {
      users = allUsers.map(user => {
        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      });

      return res.status(200).send(users);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
