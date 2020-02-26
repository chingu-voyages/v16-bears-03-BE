import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Styled from './styles/styles';
import axios from 'axios';
import { ChatContext } from './ChatWindow';
import Comment from './Comment';

const DeleteComment = props => {
  const { id, name, date, text, user_id, userImage, isEdited, setDeleteComment } = props;
  const { dispatch } = useContext(ChatContext);
  const handleDelete = e => {
    axios
      .delete(
        `/api/comments/${id}`,
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
      })
      .catch(err => console.error(err));
  };


  return (
    <div>
      <DeletePopout>
        <Title>Delete Message</Title>
        <Message>Are you sure you want to delete this comment? This cannot be undone.</Message>
        <CommentContainer>
          <Styled.CommentAvatar id={id}></Styled.CommentAvatar>
          <Styled.CommentNameDateWrapper>
            <Styled.CommentName>{name}</Styled.CommentName>
            <Styled.CommentTime>{date}</Styled.CommentTime>
          </Styled.CommentNameDateWrapper>
          <Styled.CommentText>
            <span>{text}</span>
            <Styled.CommentEdited isEdited={isEdited}>(edited)</Styled.CommentEdited>
          </Styled.CommentText>
        </CommentContainer>
        <ButtonWrapper>
        <Styled.Button onClick = {() => setDeleteComment(false)}>Cancel</Styled.Button>
        <Styled.DeleteButton onClick={handleDelete}>Delete</Styled.DeleteButton>
        </ButtonWrapper>
      </DeletePopout>
    </div>
  );
};

const DeletePopout = styled.div`
  display: flex;
  flex-flow: row wrap;
  border: 0.1rem solid black;
  position: absolute;
  bottom: 50%;
  height: 20%;
  width: 40%;
  z-index: 0;
  background-color: white;
  border-radius: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;

const Title = styled.h1`
  flex: 0 0 100%;
  padding: 0 2.4rem;
`;

const Message = styled.div`
  flex: 0 0 100%;
  padding: 0 2.4rem;
font-size: 1.5rem;;
`;

const CommentContainer = styled(Styled.CommentContainer)`
  border: 0.1rem solid black;
  flex-basis: 80%;
  margin-left: 2.4rem;
`;

const ButtonWrapper = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
flex: 0 0 calc(80% + 2.4rem);

& > button:first-child{
    margin-right: 1rem;
}`;

export default DeleteComment;
