import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ChatContext } from './ChatWindow';

/*
Posts new comment to database when enter key pressed and triggers re-render by updating ChatWindow state
*/

const EditComment = props => {
const { _id, className, children} = props;
  const [comment, setComment] = useState(children);
  const { chatState, dispatch } = useContext(ChatContext);
  

  const handleSubmit = text => {
    axios
      .patch(`/api/comments/${props._id}`, { user: chatState.user, text: text }, chatState.config)
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
    <Wrapper className = {className}>
      <Form onSubmit={handleSubmit}>
        <TextField onChange={handleOnChange} onKeyDown={handleEnter} value ={comment}></TextField>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
`;

const TextField = styled.textarea`
  padding: 0.25rem;
  border: 0.1rem solid #241722;
  resize: none;
  outline: none;
  scrollbar-color: #241722 white;
  scrollbar-width: thin;
  border-radius: 0.15rem;
  font-size: 1.6rem;
  height: 6rem;
  width: 98%;
  border-radius: 0.5rem;
  margin-left: 0.5rem;

  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    border: 0.01rem solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.4rem;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: 0.1rem solid #2c0852;
    background: #2c0852;
  }
`;

export default EditComment;
