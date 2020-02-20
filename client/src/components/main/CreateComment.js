import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
require('dotenv').config();

const url = process.env.Comment_Route;

const CreateComment = (props) => {
  const [comment, setComment] = useState('');
  const {setNewComment} = props;
  console.log(setNewComment)

  const handleSubmit = text => {
    axios
      .post('http://localhost:8000/api/comments', { user: '5e4c0f6933560b0ce8f7d0b9', text: text })
      .then( res => 
        console.log(res)
      )
      .catch(err =>
        console.log(err)
      );

    setComment('');
  };

  const handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSubmit(comment);
      setNewComment(comment)
    }
  };

  const handleOnChange = event => {
    setComment(event.target.value);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TextField onChange={handleOnChange} onKeyDown={handleEnter} value={comment} setNewComment ={setNewComment}></TextField>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Form = styled.form`
width: 100%;`

const TextField = styled.textarea`
  padding: 0.25rem;
  border: 0.05rem solid #241722;
  resize: none;
  outline: none;
  scrollbar-color: #241722 white;
  scrollbar-width: thin;
  border-radius: 0.15rem;
  font-size: 0.75rem;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.2rem;
  height: 60px;
  width: 90%;
  border-radius: 5px;

&::-webkit-scrollbar-track{
    
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
  border: 1px solid #2C0852;
  background: #2C0852;
}`


export default CreateComment;
