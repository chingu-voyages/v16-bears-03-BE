const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

/**
 * @route POST api/users
 * @access Public
 * @desc Register users
 * @todo TODO: Hash password
 */
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please add a valid email').isEmail(),
  check('password', 'Please add a password with 6 or more characters').isLength({
    min: 6
  }),
], async (req, res) => {

  // express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  
  const { name, email, password } = req.body;
  
  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({errors: [{ msg: `User with ${email} email already exists!` }]});
    }

    user = new User({
      name,
      email,
      password
    });
  
    // Saves the user to database
    await user.save();

    res.json(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }

});

module.exports = router;