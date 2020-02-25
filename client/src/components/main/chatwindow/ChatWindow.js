import React, { useReducer } from 'react';
import styled from 'styled-components';
import CreateComment from './CreateComment';
import ViewComments from './ViewComments';
export const ChatContext = React.createContext(null);

/*
Parent component
State is an object that changes when comment is posted to db
*/

//For testing, set jwt, user and loggedUser(in App.js)
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNTA1NTUzOWJmZTIwNTQyOGFhYzNjOSIsIm5hbWUiOiJuZXdfdXNlciJ9LCJpYXQiOjE1ODIzMjMwMjcsImV4cCI6MTU4MjkyNzgyNywic3ViIjoibmV3X3VzZXIifQ.tKM9qHnX540ZV-emKwfk55rkiu2oYNP7bZ3AnVXI2XU'


const initialState = {
  user: '5e5055539bfe205428aac3c9',
  config: { headers: { authorization: `bearer ${jwt}` } },
  previousComment: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_TO_DB':
      return { ...state, previousComment: action.text };

    default:
      return initialState;
  }
};

const ChatWindow = props => {
  const [chatState, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      <Container>
        <ViewComments />
        <CreateComment />
      </Container>
    </ChatContext.Provider>
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
