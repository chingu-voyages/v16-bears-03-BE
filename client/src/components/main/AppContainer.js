import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Sidebar from './sidebar/Sidebar';
import ChatWindow from './chatwindow/ChatWindow';

const Container = styled.div`
  display: flex;
`;

function AppContainer() {
  return (
    <Container>
      <Sidebar />
      <ChatWindow/>
    </Container>
  );
}

export default AppContainer;
