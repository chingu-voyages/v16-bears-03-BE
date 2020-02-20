import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CreateComment from './CreateComment';
import ViewComments from './ViewComments';

const ChatWindow = props => {
  const [newComment, setNewComment] = useState('');

  return (
    <Container>
      <ViewComments/>
      <CreateComment/>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr;
  align-self: flex-end;
`;

export default ChatWindow;
