//import mounted Socket.io server
const { io } = require('./app');

// listener fired upon socket connection with client
const socketListener = io.on('connect', socket => {
  socket.on('message', message => {
    console.log(message);
  });

  socket.on('disconnect', reason => {
    console.log(`${reason}: ${socket.id}`);

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
