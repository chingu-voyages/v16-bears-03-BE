import React from 'react';
import { AllThreads } from './thread.style';
import Thread from './Thread';

function ViewThread(props) {
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

        return <Thread key={thread._id} threadinfo={threadinfo} dispatch={props.dispatch} />;
      })}
    </AllThreads>
  );
}

export default ViewThread;
