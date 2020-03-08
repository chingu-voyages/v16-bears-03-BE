import React, { useState } from 'react';
import styled from 'styled-components';
import { Textarea } from './thread.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '../../../theme/theme';

function AddThread() {
  const [reply, setReply] = useState('');
  return (
    <div>
      <form>
        <Textarea defaultValue="Reply..." rows="3" autoFocus></Textarea>

        <Span>
          <Tooltip>Send Message</Tooltip>
          <FontAwesomeIcon icon={faFileExport} size="2x" style={{ color: '#007a5a' }} />
        </Span>
      </form>
    </div>
  );
}

const Span = styled.span`
  position: relative;
  float: right;
  margin-right: 2.5rem;
  margin-top: -3.5rem;
  padding: 0.1rem 0.5rem;
  cursor: pointer;
  &:hover {
    background: lightgray;
    & > div {
      visibility: visible;
    }
  }
`;

export default AddThread;
