const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const { createAuthToken } = require('../auth/router');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

/**
 * @route POST api/users
 * @access Public
 * @desc Register users
 */
const userRouter = io => {
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

      let generalChannelId = await Channel.find({ name: 'General' }).then(generalChannel => {
        return generalChannel[0]._id;
      });

      // this hashes the password
      password = await User.hashPassword(password);

      // .create() is a mongoose function that creates a new user and .save() it into the db
      user = await User.create({
        name,
        email,
        password,
        channels: [generalChannelId],
      });

      user = user.serialize();
      const authToken = createAuthToken({ _id: user.id, name: user.name });

      // Add the new user to general channel
      Channel.findById(generalChannelId).then(channel => {
        channel.users.push(user.id);
        channel.save();
      });

      res.status(201).json({ authToken, user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
);

router
  .route('/:userID')
  .all(jwtAuth, (req, res, next) => {
    User.findById(req.params.userID)
      .then(user => {
        if (!user) {
          return res.status(404).json({ Error: 'User not found' });
        }

        if (req.user._id !== user._id.toString()) {
          return res.status(403).json({ message: "This isn't your profile" });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    const { userID } = req.params;
    User.findById(userID, (err, user) => {
      if (err) {
        console.error(error.message);
      }
      const { name, userImage } = user;
      res.status(200).json({ name, userImage });
    });
  })
  .patch((req, res) => {
    const { name, userImage } = req.body;
    const fieldsToUpdate = { name, userImage };

    User.findById(req.params.userID)
      .then(user => {
        for (let field in fieldsToUpdate) {
          if (fieldsToUpdate[field]) {
            if (fieldsToUpdate[field] === 'null') {
              user[field] = null;
            } else {
              user[field] = fieldsToUpdate[field];
            }
          }
        }

        user.save().then(user => {
          const { id, email, name, userImage } = user;
          res.status(201).send('success');
          return {id, name, userImage}
        }).then(res =>{
            io.emit("updateUser", res)
        })
      })
      .catch(err => res.status(500).json('Something went wrong'));
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.userID)
      .then(user => res.status(204).end())
      .catch(err => res.status(500).json('Something went wrong'));
  });

  return router

}

module.exports = userRouter;
