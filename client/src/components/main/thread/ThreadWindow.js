import React from 'react';
import { ThreadContainer, Header } from './thread.style.js';
import { CloseButton } from '../../../theme/theme';
import ThreadTitle from './ThreadTitle';
import ThreadBody from './ThreadBody';

function ThreadWindow(props) {
  return (
    <ThreadContainer>
      <Header>
        <div>
          <h2>Thread</h2>
          <p style={{ color: 'gray', fontSize: '1.2rem' }}>
            <i># </i> Slack Clone
          </p>
        </div>
        <CloseButton onClick={() => props.setThreadWindow(false)}>X</CloseButton>
      </Header>
      <ThreadTitle threadinfo={props.threadinfo} />
      <ThreadBody />
    </ThreadContainer>
  );
}

export default ThreadWindow;
