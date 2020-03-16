import React, { useReducer, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import CreateComment from './CreateComment';
import ViewComments from './ViewComments';
import ThreadWindow from '../thread/ThreadWindow';
import { AppContext } from '../AppContainer';
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

const ChatWindow = props => {
  const [chatState, dispatch] = useReducer(reducer, initialState);
  const [threadWindow, setThreadWindow] = useState(false);
  const [threadinfo, setThreadInfo] = useState({});
  const [clickChange, setClickChange] = useState(1);
  const { socket } = useContext(AppContext);

  function getThreadInfo(id, name, date, text, user_id, userImage, thread, channelID) {
    setThreadInfo({
      id,
      name,
      date,
      text,
      user_id,
      userImage,
      thread,
      channelID,
    });
  }

  useEffect(() => {
    if (threadWindow) {
      socket.emit('joinThread', threadinfo.id);
    }
  }, [socket, threadWindow, threadinfo.id]);

  useEffect(() => {
    socket.on('updateUser', data => {
      if (threadinfo.user_id === data.id) {
        if (data.name) {
           setThreadInfo(prev => {
            return { ...prev, name: data.name };
          });
        
        if (data.userImage) {
          setThreadInfo(prev => {
            return { ...prev, userImage: data.userImage };
          });
        } else if (data.userImage === null) {
           setThreadInfo(prev => {
            return { ...prev, userImage: data.userImage };
          });
        }
      }
      }
    });
  }, [socket, threadinfo.user_id]);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      <Container>
        <Header># {props.currentChannel.channel.name}</Header>
        <ViewComments
          setThreadWindow={setThreadWindow}
          getThreadInfo={getThreadInfo}
          currentChannel={props.currentChannel.channel}
          setClickChange={setClickChange}
        />
        <CreateComment />
        {threadWindow && (
          <ThreadWindow
            clickChange={clickChange}
            threadinfo={threadinfo}
            setThreadWindow={setThreadWindow}
          />
        )}
      </Container>
    </ChatContext.Provider>
  );
};

const Container = styled.main`
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

const Header = styled.header`
  display: flex;
  justify-content: center;
  margin: 1.5rem 1.5rem 1.8rem 1.5rem;
  font-size: 2rem;
  align-items: flex-end;
  font-weight: 600;
  flex: 0 0 5%;
  font-size: 1.8rem;
`;

export default ChatWindow;
