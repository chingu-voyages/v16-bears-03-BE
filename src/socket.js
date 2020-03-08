//import mounted Socket.io server
const { io } = require('./app');

// listener fired upon socket connection with client

//stores all users connected to the server AND whose status is set to active
let activeUsers = [];
let awayUsers = [];

const socketListener = io.on('connect', socket => {
  socket.on('message', message => {
    console.log(message);
  });

  //add connected user to activeUsers array
  socket.on('activeUser', activeUser => {
    
    
    if(awayUsers.indexOf(activeUser.userId) === -1){

    if(activeUser.userId!== undefined && activeUser.clientSocket){
    activeUsers.push(activeUser);
 
  };

}
  io.emit('updateUserActivity', activeUsers);

  console.log(activeUsers)
  })


  socket.on('setActiveUser', activeUser => {
    
    
    awayUsers = awayUsers.filter(userId => {
      return userId!== activeUser.userId
    })

    if(awayUsers.indexOf(activeUser.userId) === -1){

      if(activeUser.userId && activeUser.clientSocket){
      activeUsers.push(activeUser);
     
    };
  }
    io.emit('updateUserActivity', activeUsers);

      
  });
  



  //remove connected user from activeUsers array
  socket.on('awayUser', awayUser => {
    activeUsers = activeUsers.filter(({ userId }) => {
      return userId !== awayUser;
    });
    if(awayUsers.indexOf(awayUser) === -1){
    awayUsers.push(awayUser)
    }
  
    io.emit('updateUserActivity', activeUsers);

  });

  //handle disconnect: remove disconnected user from activeUsers array
  socket.on('disconnect', reason => {
  
    activeUsers = activeUsers.filter(({ clientSocket }) => {
      return clientSocket != socket.id;
    });

    console.log(activeUsers)
  
   io.emit('updateUserActivity', activeUsers)
    

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
