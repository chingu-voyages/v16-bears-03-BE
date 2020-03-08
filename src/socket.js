//import mounted Socket.io server
const { io } = require('./app');

// listener fired upon socket connection with client

//stores all users connected to the server AND whose status is set to active
let activeUsers = [];

const socketListener = io.on('connect', socket => {
  socket.on('message', message => {
    console.log(message);
  });

  //add connected user to activeUsers array
  socket.on('activeUser', activeUser => {
    activeUsers.push(activeUser);

    io.emit('updateActiveUsers', activeUsers);
  });

  //remove connected user from activeUsers array
  socket.on('awayUser', awayUser => {
    activeUsers = activeUsers.filter(({ userId }) => {
      return userId !== awayUser;
    });
    io.emit('updateActiveUsers', activeUsers);
  });

  //handle disconnect: remove disconnected user from activeUsers array
  socket.on('disconnect', reason => {
    console.log(`${reason}: ${socket.id}`);
    activeUsers = activeUsers.filter(({ clientSocket }) => {
      return clientSocket != socket.id;
    });

    io.emit('updateActiveUsers', activeUsers);

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
