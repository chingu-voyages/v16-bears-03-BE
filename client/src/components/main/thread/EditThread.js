import React, { useState } from 'react';
import styled from 'styled-components';
import { SmallButton } from '../../../theme/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function EditThread({ text, setEditThread, updateThread }) {
  const [message, setMessage] = useState(text);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        updateThread(message);
      }}
    >
      <Textarea
        value={message}
        row="2"
        type="text"
        autoFocus
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
      <br />
      <SmallButton
        style={{ width: '6rem', marginRight: '1rem' }}
        background="white"
        onClick={() => {
          setEditThread(false);
        }}
      >
        Cancel
      </SmallButton>
      <SmallButton style={{ width: '13rem', background: '#007a5a' }} type="submit">
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '1rem' }} />
        Save Changes
      </SmallButton>
    </form>
  );
}

const Textarea = styled.textarea`
  width: 90%;
  border: 1px solid lightblue;
  border-radius: 10px;
  resize: none;
  background: white;
`;

export default EditThread;
