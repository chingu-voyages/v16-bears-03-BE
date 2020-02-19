import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Sidebar from './sidebar/Sidebar';

const Container = styled.div`
  display: flex;
`;

function AppContainer() {
  return (
    <Container>
      <Sidebar />
    </Container>
  );
}

export default AppContainer;
