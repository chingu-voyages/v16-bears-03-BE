import React, { useState } from 'react';
import styled from 'styled-components';
import ViewThread from './ViewThread';
import AddThread from './AddThread';

function ThreadBody(props) {
  const [allThreads, setAllThreads] = useState([]);
  const [commentId] = useState(props.commentid);

  //Todo:fetch all the threads based on the commentId

  return (
    <div style={{ padding: '1rem' }}>
      <Span>{`${allThreads.length} replies`}</Span>
      <ViewThread allThreads={allThreads} />
      <AddThread />
    </div>
  );
}

const Span = styled.span`
  font-size: 1.2em;
  color: gray;
  position: absolute;
  margin-top: -1.6rem;
  margin-left: -1rem;
  background: white;
  padding: 0rem 1rem;
`;

export default ThreadBody;
