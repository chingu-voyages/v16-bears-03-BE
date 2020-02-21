import React, { useState } from 'react';
import styled from 'styled-components';
import CreateComment from './CreateComment';
import ViewComments from './ViewComments';

/*
Parent component
State is a boolean that changes when a new comment has been created and rendered
*/

const ChatWindow = props => {
  const [newComment, setNewComment] = useState(false);

  return (
    <Container>
      <ViewComments newComment={newComment} setNewComment={setNewComment} />
      <CreateComment setNewComment={setNewComment} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80%;
  grid-area: 1/2/3/3;
  align-self: flex-end;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default ChatWindow;
