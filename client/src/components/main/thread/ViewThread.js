import React from 'react';
import { AllThreads } from './thread.style';
import Thread from './Thread';

function ViewThread(props) {
  //todo: once we get the props.allThread from the ThreadBody
  return (
    <AllThreads>
      {props.allThreads.map(thread => {
        //Todo: pass all the props to the thread,please dobule check is correct.
        return (
          <Thread
            id={thread._id}
            key={thread._id}
            text={thread.text}
            date={thread.date}
            isEdited={thread.isEdited}
            username={thread.user}
            user_id={thread.user_id}
            userImage={thread.userImage}
          />
        );
      })}
    </AllThreads>
  );
}

export default ViewThread;
