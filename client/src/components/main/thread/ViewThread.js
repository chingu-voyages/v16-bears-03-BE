import React, { useEffect, useRef } from 'react';
import { AllThreads } from './thread.style';
import Thread from './Thread';

function ViewThread(props) {
  const messageEndRef = useRef();

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [props.allThreads]);

  return (
    <AllThreads>
      {props.allThreads.map(thread => {
        const threadinfo = {
          parent_id: props.commentid,
          id: thread._id,
          text: thread.text,
          date: thread.date,
          isEdited: thread.isEdited,
          name: thread.user,
          user_id: thread.user_id,
          userImage: thread.userImage,
        };

        return <Thread threadinfo={threadinfo} dispatch={props.dispatch} />;
      })}
      <div ref={messageEndRef} />
    </AllThreads>
  );
}

export default ViewThread;
