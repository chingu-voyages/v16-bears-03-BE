import React, { useState } from 'react';
import styled from 'styled-components';
import { Textarea } from './thread.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '../../../theme/theme';
import axios from 'axios';

function AddThread({ dispatch, commentid }) {
  const [reply, setReply] = useState('Reply...');

  function SubmitReply(e) {
    e.preventDefault();
    const newThread = {
      user: localStorage.userId,
      text: reply,
      threadedComment: true,
      parentID: commentid,
    };

    axios
      .post('/api/comments/', newThread, {
        headers: { authorization: `bearer ${localStorage.authToken}` },
      })
      .then(res => {
        const thread = {
          _id: res.data._id,
          date: res.data.date,
          isEdited: false,
          text: reply,
          user: res.data.user,
          user_id: localStorage.userId,
          userImage: res.data.userImage,
        };
        dispatch({ type: 'REPLY_THREAD', thread });
        setReply('');
      })
      .catch(err => console.log(err.response.data));
  }

  function enterReply(e) {
    if (e.keyCode === 13) {
      SubmitReply(e);
    }
  }

  return (
    <div>
      <form onSubmit={SubmitReply}>
        <Textarea
          type="text"
          rows="3"
          value={reply}
          onKeyDown={enterReply}
          onChange={e => setReply(e.target.value)}
          autoFocus
        ></Textarea>

        <Span onClick={SubmitReply}>
          <Tooltip>Send Message</Tooltip>
          <FontAwesomeIcon icon={faReply} size="2x" style={{ color: '#007a5a' }} />
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
