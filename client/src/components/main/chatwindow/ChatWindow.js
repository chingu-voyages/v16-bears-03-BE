import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import CreateComment from './CreateComment';
import ViewComments from './ViewComments';
import ThreadWindow from '../thread/ThreadWindow';
export const ChatContext = React.createContext(null);

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
  const [threadWindow, setThreadWindow] = useState(false);
  const [threadinfo, setThreadInfo] = useState({});

  function getThreadInfo(id, name, date, text, user_id, userImage, thread) {
    setThreadInfo({
      id,
      name,
      date,
      text,
      user_id,
      userImage,
      thread,
    });
  }

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      <Container>
        {/*hardcoded channel header */}
        <Header>#Slack Clone</Header>

        <ViewComments setThreadWindow={setThreadWindow} getThreadInfo={getThreadInfo} />
        <CreateComment />
        {threadWindow && <ThreadWindow threadinfo={threadinfo} setThreadWindow={setThreadWindow} />}
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
