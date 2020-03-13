import React, { useReducer } from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar/Sidebar';
import ChatWindow from './chatwindow/ChatWindow';
export const AppContext = React.createContext(null);

//establish socket connection on client side
const io = require('socket.io-client');

let socket;

if (process.env.NODE_ENV === 'development') {
  socket = io('http://localhost:8000');
} else {
  socket = io();
}

socket.on('connect', () => {
  socket.send(`${socket.id} connected`);
  socket.emit('activeUser', { userId: localStorage.userId, clientSocket: socket.id });

});

const initialState = {
  channel: '',
};

const isThreadinCurrentChannel = (currentChannel, threadedCommentChannel)=>{
  return currentChannel === threadedCommentChannel
}

const reducer = (state, action) => {
  const comments = state.channel.comments
  const channel = state.channel
  let updatedComments;

  switch (action.type) {
    case 'SET_CHANNEL':
      socket.emit('setChannel', action.channel);
      return { ...state, channel: action.channel };
    case 'REPLY_THREAD':
   
      updatedComments = comments.map(comment =>{
        if(comment._id ===action.thread.commentid){
          if(comment.thread){
          comment.thread = comment.thread.concat(action.thread)}
          else{
            comment.thread = [action.thread]
          }
        }
        return comment
      });
      return {channel:{...channel, comments: updatedComments}}
    
    case 'DELETE_THREAD': 
 
      updatedComments = comments.map(comment =>{
       
      if(comment._id === action.data.parentID){
        comment.thread = comment.thread.filter(thread =>{
          return thread._id !== action.data.id
        })
      }
      return comment
    })

      return {channel:{...channel, comments: updatedComments}}
  
    case 'EDIT_THREAD':

      updatedComments = comments.map(comment =>{
        if(comment._id === action.data.parentID){
          comment.thread.forEach(thread =>{
            if (thread._id === action.data.id){
              thread.text = action.data.text
            }

          })
        }
        return comment
      })
        return {channel:{...channel, comments: updatedComments}}
    
     
    default:
      return initialState;
  }
};

function AppContainer() {
  const [appState, appDispatch] = useReducer(reducer, initialState);


  return (
    <AppContext.Provider value={{ socket, appState, appDispatch }}>
      <Container>
        <Sidebar />
        <ChatWindow />
      </Container>
    </AppContext.Provider>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr minmax(0, 1fr);
  height: 100%;
`;

export default AppContainer;
