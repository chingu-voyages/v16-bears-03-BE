import React from 'react';
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
});

function AppContainer() {
  return (
    <AppContext.Provider value={socket}>
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
