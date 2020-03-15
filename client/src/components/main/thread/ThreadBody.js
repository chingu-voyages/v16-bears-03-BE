import React, { useReducer, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ViewThread from './ViewThread';
import AddThread from './AddThread';
import { AppContext } from '../AppContainer';

function ThreadBody(props) {
  const initialstate = {
    threads: props.thread === undefined ? [] : props.thread,
  };

  const reducer = (state, action) => {
    console.log(state);
    switch (action.type) {
      case 'CLICK':
        return [...action.threads];
      case 'REPLY_THREAD':
        return [...state, action.thread];
      case 'DELETE_THREAD': {
        if (state.length === 1) {
          return [];
        } else {
          const output = state.filter(thread => {
            return thread._id !== action.id;
          });
          return output;
        }
      }
      case 'EDIT_THREAD': {
        const output = state.map(thread => {
          if (thread._id === action.data.id) {
            thread.text = action.data.text;
            thread.isEdited = true;
            return thread;
          } else {
            return thread;
          }
        });
        return output;
      }
      case 'UPDATE_USER':
        const output = state.map(thread => {
          if (thread.user_id === action.data.id) {
            if (action.data.name) {
              thread.user = action.data.name;
            }
            if (action.data.userImage) {
              thread.userImage = action.data.userImage;
            }
            return thread;
          } else {
            return thread;
          }
        });
        return output;
      default:
        return initialstate;
    }
  };

  const [allThreads, dispatch] = useReducer(reducer, initialstate.threads);

  useEffect(() => {
    const threads = props.thread === undefined ? [] : props.thread;
    dispatch({ type: 'CLICK', threads });
  }, [props.clickChange]);

  const { socket } = useContext(AppContext);

  //handles live updates to threadbody
  useEffect(() => {
    socket.on('post_threadBody', thread => {
      dispatch({ type: 'REPLY_THREAD', thread });
    });

    socket.on('edit_threadBody', data => {
      dispatch({ type: 'EDIT_THREAD', data });
    });

    socket.on('delete_threadBody', ({ id }) => {
      dispatch({ type: 'DELETE_THREAD', id });
    });

    socket.on('updateUser', data => {
      dispatch({ type: 'UPDATE_USER', data });
    });
  }, [socket]);

  return (
    <div style={{ padding: '1.5rem' }}>
      <Span>{`${allThreads.length} replies`}</Span>
      {allThreads.length > 0 && (
        <ViewThread
          commentid={props.commentid}
          dispatch={dispatch}
          allThreads={allThreads}
          channelID={props.channelID}
        />
      )}
      <AddThread dispatch={dispatch} commentid={props.commentid} channelID={props.channelID} />
    </div>
  );
}

const Span = styled.span`
  font-size: 1.2em;
  color: gray;
  position: absolute;
  margin-top: -1.9rem;
  margin-left: -1.5rem;
  background: white;
  padding: 0rem 1rem;
`;

export default ThreadBody;
