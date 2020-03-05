import React from 'react';
import { ThreadsContainer } from './thread.style';
import ViewThread from './ViewThread';
import AddThread from './AddThread';

function ThreadBody() {
  return (
    <ThreadsContainer>
      <ViewThread />
      <AddThread />
    </ThreadsContainer>
  );
}

export default ThreadBody;
