require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const passport = require('passport');


const mongoose = require('mongoose');
const { PORT, DATABASE_URL } = require('./config');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments')(io);

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

// Protected test endpoint
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({ data: 'rosebud' });
});

// Route for user authentication when logging in
app.use('/api/users/login', authRouter);

// User route
app.use('/api/users', userRouter);

// Comment route
app.use('/api/comments', jwtAuth, commentRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

mongoose.Promise = global.Promise;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    // mongoose.set('debug', true);
    mongoose.set('useCreateIndex', true);

    mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      if (err) {
        return reject(err);
      }

      server
        .listen((port = PORT), () => {
          console.log(`Your server is listening at http://localhost:${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });

      io.on('connect', socket => {
        console.log('users connected');
        socket.on('message', msg => {
          console.log('message connect' + msg);
        });

        socket.on('comment', comment =>{
          console.log(comment.user, comment.text)
        })

        socket.on('post', comment =>{
          (comment.map(element =>{
            console.log(element)
          }))
        })

        socket.on('disconnect', () => {
          console.log('goodbye user');
        });
      });

      
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}


module.exports = runServer(DATABASE_URL).catch(err => console.error(err));
