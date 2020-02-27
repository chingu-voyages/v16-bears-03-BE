import React, { useState, useContext } from 'react';
import Styled from './styles/comment.styles';
import axios from 'axios';
import { ChatContext } from './ChatWindow';

/*
Posts new comment to database when enter key pressed and triggers re-render by updating ChatWindow state
*/

const CreateComment = props => {
  const [comment, setComment] = useState('');
  const { dispatch } = useContext(ChatContext);

  const handleSubmit = text => {
    axios
      .post(
        '/api/comments',
        {
          user: localStorage.userId,
          text: text,
        },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      )
      .then(() => {
        dispatch({ type: 'POST_TO_DB', text });
      })
      .catch(err => console.error(err));

    setComment('');
  };

  const handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(comment);
    }
  };

  const handleOnChange = event => {
    setComment(event.target.value);
  };

  return (
    <Styled.CommentFormWrapper>
      <Styled.CommentForm >
        <Styled.CommentTextArea onChange={handleOnChange} onKeyDown={handleEnter} value={comment} />
      </Styled.CommentForm>
    </Styled.CommentFormWrapper>
  );
};

export default CreateComment;
