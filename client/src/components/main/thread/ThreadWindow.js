import React from 'react';
import { ThreadContainer, Header } from './thread.style.js';
import { CloseButton } from '../../../theme/theme';
import ThreadTitle from './ThreadTitle';
import ThreadBody from './ThreadBody';

function ThreadWindow(props) {
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
        <CloseButton onClick={() => props.setThreadWindow(false)}>X</CloseButton>
      </Header>
      <ThreadTitle threadinfo={props.threadinfo} />
      <ThreadBody commentid={props.threadinfo.id} />
    </ThreadContainer>
  );
}

export default ThreadWindow;
