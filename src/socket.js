//import mounted Socket.io server
const { io } = require('./app');

// listener fired upon socket connection with client

//stores all users connected to the server AND whose status is set to active
let activeUsers = [];

//stores users connected to the server AND whose status is set to away
let awayUsers = [];

const socketListener = io.on('connect', socket => {
  socket.on('message', message => {
    console.log(message);
  });

  //If connected userId is found in away array, add to away array, else, add to active array. This keeps user status persistent across multiple logins.
  socket.on('activeUser', activeUser => {
    if (activeUser.userId && activeUser.clientSocket) {
      if (
        awayUsers.some(({ userId }) => {
          return userId === activeUser.userId;
        })
      ) {
        awayUsers = awayUsers.concat(activeUser);
      } else {
        activeUsers = activeUsers.concat(activeUser);
      }
    }
    io.emit('updateUserActivity', activeUsers);

    console.log(activeUsers);
  });

  socket.on('setActiveUser', activeUser => {

    if (activeUser.userId && activeUser.clientSocket) {

      //add all user's connections to activeUser array
      activeUsers = activeUsers.concat(
        awayUsers.filter(({ userId }) => {
          return userId === activeUser.userId;
        }),
      );

      //remove all user's connection from awayUsers array
      awayUsers = awayUsers.filter(({ userId }) => {
        return userId !== activeUser.userId;
      });
    }

    io.emit('updateUserActivity', activeUsers);
  });

  socket.on('setAwayUser', awayUser => {

    if (awayUser.userId && awayUser.clientSocket) {

      //add all user's connections to awayUsers array
      awayUsers = awayUsers.concat(
        activeUsers.filter(({ userId }) => {
          return userId === awayUser.userId;
        }),
      );

      //remove all user's connections from activeUsers array
      activeUsers = activeUsers.filter(({ userId }) => {
        return userId !== awayUser.userId;
      });
    }

    io.emit('updateUserActivity', activeUsers);
  });

  //handle disconnect: remove disconnected user from either array
  socket.on('disconnect', reason => {
    activeUsers = activeUsers.filter(({ clientSocket }) => {
      return clientSocket != socket.id;
    });

    awayUsers = awayUsers.filter(({ clientSocket }) => {
      return clientSocket != socket.id;
    });

 
    io.emit('updateUserActivity', activeUsers);

    if (reason === 'io server disconnect') {
      // the disconnection was initiated by the server, reconnect manually
      socket.connect();
    }
    // else the socket will automatically try to reconnect
  });

  socket.on('error', error => {
    console.log(error);
  });
});

module.exports = socketListener;
