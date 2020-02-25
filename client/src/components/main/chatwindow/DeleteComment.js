import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ChatContext } from './ChatWindow';

const DeleteComment = props => {
  const handleSubmit = e => {
    axios
      .delete(
        `/api/comments/${_id}`,
        {
          user: localStorage.userId,
          text: text,
        },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      )
      .then(() => {
        dispatch({ type: 'DELETE_TO_DB', text });
        setEditComment(false);
      })
      .catch(err => console.error(err));

    setComment('');
  };

  return <div></div>;
};

const DeletePopout = styled.div`
  display: flex;
  flex-flow: column wrap;
  border: 0.1rem solid black;
  position: relative;
  bottom: 50%;
  right: 50%;
  height: 10rem;
  z-index: 0;
  background-color: white;
  border-radius: 0.5rem;
`;
