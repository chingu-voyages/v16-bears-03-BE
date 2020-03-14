import React, { useReducer, useEffect } from 'react';
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

//updates user info in entire comment
const updateUser = (arr, data) => {
  const { id, name, userImage } = data;

  const updatedComments = arr.map(element => {
    if (element.thread) {
      element.thread = updateUser(element.thread, data);
    }

    if (element.user_id === id) {
      if (name) {
        element.user = name;
      }

      if (userImage) {
        element.userImage = userImage;
      }
      return element;
    }
    return element;
  });

  return updatedComments;
};

//reducer that handles user action
const reducer = (state, action) => {
  const comments = state.channel.comments;
  const channel = state.channel;

  switch (action.type) {
    //channel actions
    case 'SET_CHANNEL':
      socket.emit('setChannel', action.channel);
      return { ...state, channel: action.channel };

    //thread actions
    case 'REPLY_THREAD': {
      const updatedComments = comments.map(comment => {
        if (comment._id === action.thread.commentid) {
          if (comment.thread) {
            comment.thread = comment.thread.concat(action.thread);
          } else {
            comment.thread = [action.thread];
          }
        }
        return comment;
      });

      return { channel: { ...state.channel, comments: updatedComments } };
    }

    case 'DELETE_THREAD': {
      const updatedComments = comments.map(comment => {
        if (comment._id === action.data.parentID) {
          comment.thread = comment.thread.filter(thread => {
            return thread._id !== action.data.id;
          });
        }
        return comment;
      });

      return { channel: { ...channel, comments: updatedComments } };
    }

    case 'EDIT_THREAD': {
      const updatedComments = comments.map(thread => {
        if (thread._id === action.data.id) {
          thread.text = action.data.text;
          thread.isEdited = true;
          return thread;
        } else {
          return thread;
        }
      });
      return { channel: { ...channel, comments: updatedComments } };
    }

    //comment actions
    case 'ADD_COMMENT': {
      const updatedComments = state.channel.comments.concat(action.comment);
      return { channel: { ...channel, comments: updatedComments } };
    }

    case 'EDIT_COMMENT': {
      const updatedComments = state.channel.comments.map(comment => {
        if (comment._id === action.editedComment._id) {
          return action.editedComment;
        } else {
          return comment;
        }
      });

      return { channel: { ...channel, comments: updatedComments } };
    }

    case 'DELETE_COMMENT': {
      const updatedComments = state.channel.comments.filter(comment => comment._id !== action.id);

      return { channel: { ...channel, comments: updatedComments } };
    }

    //user profile actions
    case 'UPDATE_USER': {
      const updatedComments = updateUser(state.channel.comments, action.data);

      return { channel: { ...channel, comments: updatedComments } };
    }

    default:
      return initialState;
  }
};

function AppContainer() {
  useEffect(() => {
    socket.on('post', comment => {
      appDispatch({ type: 'ADD_COMMENT', comment });
    });

    socket.on('edit', editedComment => {
      appDispatch({ type: 'EDIT_COMMENT', editedComment });
    });

    socket.on('delete', id => {
      appDispatch({ type: 'DELETE_COMMENT', id });
    });

    socket.on('updateUser', data => {
      appDispatch({ type: 'UPDATE_USER', data });
    });
  }, []);

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
