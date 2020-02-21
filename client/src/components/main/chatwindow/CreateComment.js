import React, { useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

/*
Posts new comment to database when enter key pressed
Set newComment to true using Parent's dispatch
*/

const jwt = '';
const config = { headers: { authorization: `bearer ${jwt}` } };

const CreateComment = props => {
  const { setNewComment } = props;
  const [comment, setComment] = useState('');

  const handleSubmit = text => {
    axios
      .post('/api/comments', { user: '5e4deef29b70942e38591863', text: text }, config)
      .catch(err => console.error(err));

    setComment('');
  };

  const handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(comment);
      setNewComment(true);
    }
  };

  const handleOnChange = event => {
    setComment(event.target.value);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TextField onChange={handleOnChange} onKeyDown={handleEnter} value={comment} />
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

export default CreateComment;
