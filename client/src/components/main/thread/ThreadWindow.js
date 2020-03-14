import React from 'react';
import { ThreadContainer, Header } from './thread.style.js';
import { CloseButton } from '../../../theme/theme';
import Thread from './Thread';
import ThreadBody from './ThreadBody';

function ThreadWindow(props) {
  return (
    <ThreadContainer>
      <Header>
        <div>
          <h1>Thread</h1>
          <p style={{ color: 'gray', fontSize: '1.2rem' }}>
            <i># </i> Slack Clone
          </p>
        </div>
        <CloseButton onClick={() => props.setThreadWindow(false)}>X</CloseButton>
      </Header>
      <Thread threadinfo={props.threadinfo} />
      <ThreadBody commentid={props.threadinfo.id} thread={props.threadinfo.thread} />
    </ThreadContainer>
  );
}

export default ThreadWindow;
