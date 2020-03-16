import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Styled from './styles/comment.styles';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '../../../theme/theme';
import ReplyAvatar from './ReplyAvatar';

//Receives UTC date and returns time and date in local twelve-hour time

export const formatDate = date => {
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
  const {
    id,
    name,
    date,
    text,
    user_id,
    userImage,
    isEdited,
    thread,
    channelID,
    refContainer,
  } = props;
  const dropdown = useRef(null);
  const menu = useRef(null);
  const [isHidden, setIsHidden] = useHideDropdown(dropdown);
  const [editComment, setEditComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);

  //returns the distance in px between top of ChatWindow container and top of menu element, adjusting for scroll.
  const getMenuPos = ref => {
    return ref.current.offsetTop - refContainer.current.scrollTop;
  };

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

  const OpenThreadWindow = e => {
    props.setThreadWindow(true);
    props.setClickChange(Math.random());
    props.getThreadInfo(id, name, date, text, user_id, userImage, thread, channelID);
  };

  const getDateDifferent = thread => {
    if (thread.length !== 0) {
      const date = thread[thread.length - 1].date;
      let currentDate = new Date();
      let differentInTime = currentDate.getTime() - new Date(date).getTime();
      let differentInDays = differentInTime / (1000 * 3600 * 24);
      if (parseInt(differentInDays) > 1) {
        return `${parseInt(differentInDays)} days ago`;
      } else if (parseInt(differentInDays) === 1) {
        return `1 day ago`;
      }
    }
  };

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
          {thread && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <ReplyAvatar thread={thread} />
              <ThreadNote onClick={OpenThreadWindow}>
                {thread.length > 1
                  ? `${thread.length} replies`
                  : thread.length === 1
                  ? `${thread.length} reply`
                  : ''}
              </ThreadNote>
              <Time>{getDateDifferent(thread)}</Time>
            </div>
          )}
        </Styled.CommentTextWrapper>
      )}

      <GroupButton>
        <Span onClick={OpenThreadWindow}>
          <Tooltip>{thread && thread.length > 0 ? 'Reply to thread' : 'Start a thread'}</Tooltip>
          <FontAwesomeIcon icon={faCommentDots} style={{ color: 'rgb(29, 28, 29)' }} size="2x" />
        </Span>

        <Styled.CommentMenu show={user_id === localStorage.userId} onClick={handleMenu} ref={menu}>
          <Tooltip>Edit/Delete</Tooltip>
          <Styled.CommentKebab></Styled.CommentKebab>
          <Styled.CommentKebab></Styled.CommentKebab>
          <Styled.CommentKebab></Styled.CommentKebab>
        </Styled.CommentMenu>
      </GroupButton>

      {!isHidden && (
        <Styled.CommentDropdown ref={dropdown} pos={() => getMenuPos(menu)}>
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

const GroupButton = styled.div`
  visibility: hidden;
  padding: 0.5rem;
  border: 0.5px solid lightgray;
  position: absolute;
  top: -1.5rem;
  right: 3rem;
  border-radius: 10%;
  background: rgb(224, 224, 224);
`;
const Span = styled.span`
  cursor: pointer;
  float: right;
  &:hover {
    & > div {
      visibility: visible;
    }
  }
`;

const ThreadNote = styled.div`
  color: rgb(18, 100, 163);
  cursor: pointer;
  font-size: 1.2rem;
  padding-top: 1rem;
  font-weight: bold;
`;

const Time = styled.span`
  color: gray;
  font-size: 1.2rem;
  margin-left: 1.2rem;
  padding-top: 1rem;
`;
export default Comment;
