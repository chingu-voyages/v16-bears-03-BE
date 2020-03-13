//import mounted Socket.io server
const { io } = require('./app');

// listener fired upon socket connection with client

//stores objects containing userId and connected socket ({userId, socket}) for users whose status is set to active
let activeUserConnections = [];

//stores objects containing userId and connected socket ({userId, socket}) for users whose status is set to away
let awayUserConnections = [];

//stores userIds for users who set their status to away
let awayUserIds = [];

//connect event emitted in AppContainer and Sidebar components
const socketListener = io.on('connect', socket => {
  socket.on('message', message => {
    console.log(message);
  });

  //If connected userId is found in away arrays, add to away array, else, add to active array. This keeps user status persistent across multiple logins.
  socket.on('activeUser', activeUser => {
    //verify userId and socket exist
    if (activeUser.userId && activeUser.clientSocket) {
      if (
        awayUserConnections.some(({ userId }) => {
          return userId === activeUser.userId;
        }) ||
        awayUserIds.indexOf(activeUser.userId) !== -1
      ) {
        awayUserConnections = awayUserConnections.concat(activeUser);
      } else {
        activeUserConnections = activeUserConnections.concat(activeUser);
      }
    }
    io.emit('updateUserActivity', activeUserConnections);
  });

  //emitted from User component
  socket.on('setAwayUser', awayUser => {
    if (awayUser.userId && awayUser.clientSocket) {
      //add userId to awayUserIds array
      awayUserIds = awayUserIds.concat(awayUser.userId);

      //add all user's connections to awayUserConnections array
      awayUserConnections = awayUserConnections.concat(
        activeUserConnections.filter(({ userId }) => {
          return userId === awayUser.userId;
        }),
      );

      //remove all user's connections from activeUserConnections array
      activeUserConnections = activeUserConnections.filter(({ userId }) => {
        return userId !== awayUser.userId;
      });
    }

    io.emit('updateUserActivity', activeUserConnections);
  });

  //emitted from User component
  socket.on('setActiveUser', activeUser => {
    if (activeUser.userId && activeUser.clientSocket) {
      //add all user's connections to activeUser array
      activeUserConnections = activeUserConnections.concat(
        awayUserConnections.filter(({ userId }) => {
          return userId === activeUser.userId;
        }),
      );

      //remove all user's connection from awayUserConnections array
      awayUserConnections = awayUserConnections.filter(({ userId }) => {
        return userId !== activeUser.userId;
      });

      //remove userId from awayUserIds array
      awayUserIds = awayUserIds.filter(userId => {
        return userId !== activeUser.userId;
      });
    }

    io.emit('updateUserActivity', activeUserConnections);
  });

  socket.on('joinChannel', channelID => {
    socket.leaveAll();
    socket.join(channelID);
  });

  socket.on('post_thread', thread =>{
    socket.broadcast.emit("post_thread", thread)
  })


  socket.on('edit_thread', data=>{
    socket.broadcast.emit("edit_thread", data)
  })

  socket.on('delete_thread', (data)=>{
    socket.broadcast.emit("delete_thread", data)
  })

  //handle disconnect: remove disconnected user from either array
  socket.on('disconnect', reason => {
    activeUserConnections = activeUserConnections.filter(({ clientSocket }) => {
      return clientSocket != socket.id;
    });

    awayUserConnections = awayUserConnections.filter(({ clientSocket }) => {
      return clientSocket != socket.id;
    });

    io.emit('updateUserActivity', activeUserConnections);

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
