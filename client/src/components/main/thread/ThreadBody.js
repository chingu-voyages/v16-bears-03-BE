import React, { useReducer } from 'react';
import styled from 'styled-components';
import ViewThread from './ViewThread';
import AddThread from './AddThread';

function ThreadBody(props) {
  const initialstate = {
    threads: props.thread === undefined ? [] : props.thread,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'REPLY_THREAD':
        return [...state, action.thread];
      case 'DELETE_THREAD': {
        const output = state.filter(thread => {
          return thread._id !== action.id;
        });
        return output;
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

      default:
        return initialstate;
    }
  };

  const [allThreads, dispatch] = useReducer(reducer, initialstate.threads);

  return (
    <div style={{ padding: '1.5rem' }}>
      <Span>{`${allThreads.length} replies`}</Span>
      {allThreads.length > 0 && (
        <ViewThread commentid={props.commentid} dispatch={dispatch} allThreads={allThreads} />
      )}
      <AddThread dispatch={dispatch} commentid={props.commentid} />
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
