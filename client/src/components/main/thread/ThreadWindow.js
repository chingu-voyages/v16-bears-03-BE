import React from 'react';
import { ThreadContainer, Header } from './thread.style.js';
import { CloseButton } from '../../../theme/theme';

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
    </ThreadContainer>
  );
}

export default ThreadWindow;
