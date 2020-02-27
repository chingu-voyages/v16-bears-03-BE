import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Styled from './styles/comment.styles';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';

//Receives UTC date and returns time and date in local twelve-hour time

const formatDate = date => {
  const dateInLocalTime = new Date(date);

  const hours =
    dateInLocalTime.getHours() > 12 ? dateInLocalTime.getHours() - 12 : dateInLocalTime.getHours();
  const minutes =
    dateInLocalTime.getMinutes() < 10
      ? `0${dateInLocalTime.getMinutes()}`
      : dateInLocalTime.getMinutes();

  if (dateInLocalTime.getHours() > 12 && dateInLocalTime.getHours() < 24) {
    return `${dateInLocalTime.toDateString()} ${hours}:${minutes}pm`;
  } else {
    return `${dateInLocalTime.toDateString()} ${hours}:${minutes}am`;
  }
};

//custom hook that hides comment menu when document body is clicked

const useHideDropdown = ref => {
  const [isHidden, setIsHidden] = useState(true);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsHidden(!isHidden);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return [isHidden, setIsHidden];
};

//custom hook to display avatar

const useAvatar = (user_id, userImage, id) => {
  useEffect(() => {
    const script = document.createElement('script');

    const defaultUserImg = `jdenticon.toSvg('${user_id}', 200)`;
    const userSetImage = `"<img src='${userImage}' >"`;

    script.innerHTML = `var placeholder = document.getElementById("${id}"); placeholder.innerHTML = ${
      !userImage ? defaultUserImg : userSetImage
    }`;

    document.body.appendChild(script);
  });
};

// Comment Component

const Comment = props => {
  const { id, name, date, text, user_id, userImage, isEdited } = props;
  const dropdown = useRef(null);
  const [isHidden, setIsHidden] = useHideDropdown(dropdown);
  const [editComment, setEditComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);

  const handleMenu = e => {
    setIsHidden(!isHidden);
  };

  const handleEditComment = e => {
    setEditComment(!editComment);
    setIsHidden(!isHidden);
  };

  const handleDeleteComment = e => {
    setDeleteComment(!deleteComment);
    setIsHidden(!isHidden);
  };

  useAvatar(user_id, userImage, id);

  return (
    <Styled.CommentContainer>
      <Styled.CommentAvatar id={id} />

      <Styled.CommentNameDateWrapper>
        <Styled.CommentName>{name}</Styled.CommentName>
        <Styled.CommentTime>{formatDate(date)}</Styled.CommentTime>
      </Styled.CommentNameDateWrapper>

      {editComment ? (
        <StyledEditComment _id={id} setEditComment={setEditComment}>
          {text}
        </StyledEditComment>
      ) : (
        <Styled.CommentTextWrapper>
          <Styled.CommentText>{text}</Styled.CommentText>
          <Styled.CommentEdited isEdited={isEdited}>(edited)</Styled.CommentEdited>
        </Styled.CommentTextWrapper>
      )}

      <Styled.CommentMenu show={user_id === localStorage.userId} onClick={handleMenu}>
        ...
      </Styled.CommentMenu>

      {!isHidden && (
        <Styled.CommentDropdown ref={dropdown}>
          <Styled.MenuButton onClick={handleEditComment}>Edit Comment</Styled.MenuButton>
          <Styled.MenuDeleteButton onClick={handleDeleteComment}>
            Delete Comment
          </Styled.MenuDeleteButton>
        </Styled.CommentDropdown>
      )}

      {deleteComment && (
        <DeleteComment
          id={id}
          name={name}
          date={formatDate(date)}
          text={text}
          user_id={user_id}
          userImage={userImage}
          isEdited={isEdited}
          deleteComment={deleteComment}
          setDeleteComment={setDeleteComment}
          useAvatar={useAvatar}
        ></DeleteComment>
      )}
    </Styled.CommentContainer>
  );
};

const StyledEditComment = styled(EditComment)`
  grid-area: 2/2/3/3;
`;

export default Comment;
