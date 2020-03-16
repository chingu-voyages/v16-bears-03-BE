import React, { useContext } from 'react';
import { ThreadContainer, Header } from './thread.style.js';
import { CloseButton } from '../../../theme/theme';
import Thread from './Thread';
import ThreadBody from './ThreadBody';
import { AppContext } from '../AppContainer';

function ThreadWindow(props) {
  const { socket } = useContext(AppContext);

  //todo:change channel's name after chanel route is set.

  return (
    <ThreadContainer>
      <Header>
        <div>
          <h1>Thread</h1>
          <p style={{ color: 'gray', fontSize: '1.2rem' }}>
            <i># </i> Slack Clone
          </p>
        </div>
        <CloseButton
          onClick={() => {
            props.setThreadWindow(false);
            socket.emit('leaveThread', props.threadinfo.id);
          }}
        >
          X
        </CloseButton>
      </Header>
      <Thread threadinfo={props.threadinfo} />
      <ThreadBody
        clickChange={props.clickChange}
        commentid={props.threadinfo.id}
        thread={props.threadinfo.thread}
        channelID={props.threadinfo.channelID}
      />
    </ThreadContainer>
  );
}

export default ThreadWindow;
