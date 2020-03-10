'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.name,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256',
  });
};

const localAuth = passport.authenticate('local', { session: false });

router.post('/', localAuth, (req, res) => {
  const user = req.user.serialize();
  const authToken = createAuthToken({ _id: user.id, name: user.name });
  res.json({ authToken, user });
});

module.exports = { router, createAuthToken };
