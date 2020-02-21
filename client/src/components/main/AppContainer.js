import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Sidebar from './sidebar/Sidebar';
import ChatWindow from './chatwindow/ChatWindow';

const Container = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr minmax(0, 1fr);
  height: 100%;
`;

function AppContainer() {
  return (
    <Container>
      <Sidebar />
      <ChatWindow />
    </Container>
  );
}

export default AppContainer;
