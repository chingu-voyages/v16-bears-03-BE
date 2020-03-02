import React, { useContext } from 'react';
import styled from 'styled-components';
import Styled from './styles/comment.styles';
import axios from 'axios';
import { ChatContext } from './ChatWindow';

const DeleteComment = props => {
  const {
    id,
    name,
    date,
    text,
    user_id,
    userImage,
    isEdited,
    deleteComment,
    setDeleteComment,
    useAvatar,
  } = props;
  const { dispatch } = useContext(ChatContext);
  const deletedId = 'deletedId';

  const handleDelete = e => {
    axios
      .delete(`/api/comments/${id}`, {
        headers: { authorization: `bearer ${localStorage.authToken}` },
      })
      .then(() => {
        dispatch({ type: 'DELETE_FROM_DB', text });
      })
      .catch(err => console.error(err));

    setDeleteComment(false);
  };

  useAvatar(user_id, userImage, deletedId);

  return (
    <div>
      <DeletePopout>
        <Title>Delete Message</Title>
        <Message>Are you sure you want to delete this comment? This cannot be undone.</Message>
        <CommentContainer>
          <Styled.CommentAvatar id={deletedId}></Styled.CommentAvatar>
          <Styled.CommentNameDateWrapper>
            <Styled.CommentName>{name}</Styled.CommentName>
            <Styled.CommentTime>{date}</Styled.CommentTime>
          </Styled.CommentNameDateWrapper>
          <CommentText>
            <Styled.CommentText>{text}</Styled.CommentText>
            <Styled.CommentEdited isEdited={isEdited}>(edited)</Styled.CommentEdited>
          </CommentText>
        </CommentContainer>
        <ButtonWrapper>
          <Styled.Button onClick={() => setDeleteComment(false)}>Cancel</Styled.Button>
          <Styled.DeleteButton onClick={handleDelete}>Delete</Styled.DeleteButton>
        </ButtonWrapper>
      </DeletePopout>
      {deleteComment && <Overlay></Overlay>}
    </div>
  );
};

const DeletePopout = styled.div`
  display: flex;
  flex-flow: row wrap;
  border: 0.1rem solid transparent;
  position: fixed;
  bottom: 50%;
  height: auto;
  width: 40%;
  z-index: 25;
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
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CommentContainer = styled(Styled.CommentContainer)`
  border: 0.1rem solid rgb(29, 28, 29, 0.1);
  border-radius: 0.2rem;
  flex-basis: 80%;
  margin-left: 2.4rem;
`;

const CommentText = styled(Styled.CommentTextWrapper)`
  overflow: auto;
  max-height: 10rem;
  scrollbar-color: #919191;
  scrollbar-width: thin;

  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    border: 0.01rem solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.7rem;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: 0.4rem solid #919191;
    background: #919191;
 
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 calc(80% + 2.4rem);
  margin-bottom: 1rem;

  & > button:first-child {
    margin-right: 1rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  cursor: pointer; /* Add a pointer on hover */
`;

export default DeleteComment;
