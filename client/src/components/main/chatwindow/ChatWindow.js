import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import CreateComment from './CreateComment';
import ViewComments from './ViewComments';
export const ChatContext = React.createContext(null);
const io = require('socket.io-client');
const socket = io.connect('http://localhost:8000', { resource: 'node_modules/socket.io' });

/*
Parent component
State is an object that changes when comment is posted to db
*/

const initialState = {
  previousComment: '',
  newComment: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'POST_TO_DB':
      return { ...state, newComment: true, previousComment: action.text };
    case 'PATCH_TO_DB':
      return { ...state, newComment: false, previousComment: action.text };
    case 'DELETE_FROM_DB':
      return { ...state, newComment: false, previousComment: action.text };
    default:
      return initialState;
  }
};







const ChatWindow = () => {
  const [chatState, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{

    socket.on('connect', () => {
      socket.emit('message', ' hello world');
      return;
    });
    socket.on('disconnect', () => {
      socket.emit('bye', ' goodbye, world');
      return
    });
    
    socket.on('post', (msg)=>{
      socket.emit('post', [msg.user, msg.text, msg.date])
      dispatch({ type: 'POST_TO_DB'})
    })

  }, [])

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      <Container>

        {/*hardcoded channel header */}
        <Header>#Slack Clone</Header>

        <ViewComments />
        <CreateComment />
      </Container>
    </ChatContext.Provider>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  grid-area: 1/2/3/3;
  align-self: flex-end;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  color: rgb(29, 28, 29);
`;

const Header = styled.section`
  display: flex;
  margin-left: 0.5rem;
  font-size: 2rem;
  align-items: flex-end;
  font-weight: 600;
  flex: 0 0 5%;
  padding: 0.5rem 0.5rem;
  font-size: 1.8rem;
`;

export default ChatWindow;
