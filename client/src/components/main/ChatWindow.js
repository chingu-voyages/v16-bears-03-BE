import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CreateComment from './CreateComment';
import ViewComments from './ViewComments';

const ChatWindow = props => {
  const [newComment, setNewComment] = useState('');

  return (
    <Container>
      <ViewComments></ViewComments>
      <CreateComment></CreateComment>
    </Container>
  );
};

const Container = styled.div`
  width: 800px;
  display: grid;
  grid-template-rows: 4fr 1fr;
  grid-template-columns: 1fr;
  font-family: 'Arimo', sans-serif;
`;

export default ChatWindow;
