//import mounted Socket.io server
const { io } = require('./app');

// listener fired upon socket connection with client

let activeUsers = [];
const socketListener = io.on('connect', socket => {
  socket.on('message', message => {
    console.log(message);
  });

  socket.on('activeUser', activeUser => {
    console.log(activeUser);
    activeUsers.push(activeUser);
    console.log(activeUsers);
    io.emit('updateActiveUsers', activeUsers);
  });

  socket.on('isConnected', (id, callback) => {
    callback(io.sockets.connected[id] && io.sockets.connected[id].connected);
  });

  socket.on('disconnect', reason => {
    console.log(`${reason}: ${socket.id}`);
    activeUsers = activeUsers.filter(({ clientSocket }) => {
      return clientSocket != socket.id;
    });
    console.log(socket.id);
    console.log(activeUsers);

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
