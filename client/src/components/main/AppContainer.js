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
  //socket.emit('joinChannel', generalChannel.id);

});

const initialState = {
  channel: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHANNEL':
      socket.emit('setChannel', action.channel);
      return { ...state, channel: action.channel };
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
