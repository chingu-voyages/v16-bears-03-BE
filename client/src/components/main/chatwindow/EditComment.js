import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ChatContext } from './ChatWindow';

/*
Posts new comment to database when enter key pressed and triggers re-render by updating ChatWindow state
*/

const EditComment = props => {
  const { _id, className, setEditComment, children } = props;
  const [comment, setComment] = useState(children);
  const { dispatch } = useContext(ChatContext);

  const handleSubmit = text => {
    axios
      .patch(
        `/api/comments/${_id}`,
        {
          user: localStorage.userId,
          text: text.replace(/\(edited\)$/, '') + ' (edited)',
        },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      )
      .then(() => {
        dispatch({ type: 'PATCH_TO_DB', text });
        setEditComment(false);
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
    <Wrapper className={className}>
      <Form onSubmit={handleSubmit}>
        <TextField onChange={handleOnChange} onKeyDown={handleEnter} value={comment}></TextField>

        <Button onClick={() => setEditComment(false)}>Cancel</Button>
        <Button onClick={() => handleSubmit(comment)}>Save</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
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
  flex: 0 1 100%;

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

const Button = styled.button`
  user-select: none;
  border: 0;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  min-height: 2.8rem;
  overflow-x: hidden;
  padding: 0 0;
  text-overflow: ellipsis;
  font-size: 1.5rem;
  text-align: left;
  flex: 0 0 7.5%;
`;

export default EditComment;
