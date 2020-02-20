import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNGRlZWYyOWI3MDk0MmUzODU5MTg2MyIsIm5hbWUiOiJtZXJyeSIsImVtYWlsIjoibWVycnlAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUTY0LkdENzFBODBWdS9kV3dxY25lLno0ZDJzUTlhenV0Vm9Hby5QRkk2SmpKdE5TYkVEL2kiLCJfX3YiOjB9LCJpYXQiOjE1ODIyMTIxNTcsImV4cCI6MTU4MjgxNjk1Nywic3ViIjoibWVycnkifQ.Tz9qXAZdn6pPLotAFuUTkiND0AvRbR1E0wObvmF3Xy4';
const config = { headers: { authorization: `bearer ${jwt}` } };

const CreateComment = props => {
  const [comment, setComment] = useState('');

  const handleSubmit = text => {
    axios
      .post('/api/comments', { user: '5e4deef29b70942e38591863', text: text }, config)
      .then(res => console.log(res))
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
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TextField onChange={handleOnChange} onKeyDown={handleEnter} value={comment}/>
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
  border-radius: .5rem;
  margin-left: .5rem;

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
    border: .1rem solid #2c0852;
    background: #2c0852;
  }
`;

export default CreateComment;
