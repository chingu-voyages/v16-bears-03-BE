'use strict';

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const localStrategy = new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
  let user;

  User.findOne({ email })
    .then(_user => {
      user = _user;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email or password',
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email or password',
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256'],
  },
  (payload, done) => {
    User.findById(payload.user._id, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, payload.user);
      } else {
        return done(null, false);
      }
    });
  },
);

module.exports = { localStrategy, jwtStrategy };
