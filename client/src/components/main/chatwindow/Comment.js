import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import EditComment from './EditComment';

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

// Comment Component

const Comment = props => {
  const { id, name, date, text, user_id, userImage, isEdited } = props;
  const dropdown = useRef(null);
  const [toggleMenu, setMenu] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [isHidden, setIsHidden] = useHideDropdown(dropdown);
  const [deleteComment, setDeleteComment] = useState(false)

  const handleHover = e => {
    setMenu(!toggleMenu)
  };

  const handleMenu = e => {
    setIsHidden(!isHidden);
  };

  const handleEditComment = e => {
    setEditComment(!editComment);
    setIsHidden(!isHidden);
  };

  

  useEffect(() => {
    const script = document.createElement('script');

    const defaultUserImg = `jdenticon.toSvg('${user_id}', 200)`;
    const userSetImage = `"<img src='${userImage}' >"`;

    script.innerHTML = `var placeholder = document.getElementById("${id}"); placeholder.innerHTML = ${
      !userImage ? defaultUserImg : userSetImage
    }`;

    document.body.appendChild(script);
  });

  return (
    <Wrapper onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <Avatar id={id} />

      <UserDateWrapper>
        <Name>{name}</Name>
        <Time>{formatDate(date)}</Time>
      </UserDateWrapper>
      {editComment ? (
        <StyledEditComment _id={id} setEditComment={setEditComment}>
          {text}
        </StyledEditComment>
      ) : (
        <Text><span>{text}</span>
        <Edited isEdited = {isEdited}>(edited)</Edited>
        </Text> 
      )}
      
      <Menu show={toggleMenu} onClick={handleMenu}>
        ...
      </Menu>
      {!isHidden && (
        <List ref={dropdown}>
          <Button onClick={handleEditComment}>Edit Comment</Button>
          <Button onClick = {()=> setDeleteComment(true)}>Delete Comment</Button>
        </List>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 1rem;
  width: 100%;
  flex-basis: 100%;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  grid-area: 1/1/3/2;
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  align-self: flex-start;
  margin-right: 0.25rem;

  & > svg,
  img {
    height: 3.6rem;
    width: 3.6rem;
  }
`;

const UserDateWrapper = styled.div`
  grid-area: 1/2/2/3;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Name = styled.div`
  font-size: 1.6rem;
  margin-right: 0.5rem;
  font-weight: 600;
`;

const Time = styled.div`
  font-size: 1.2rem;
`;

const Text = styled.div`
  grid-area: 2/2/3/4;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1c1d1c;
  margin-top: 0.5rem;
  
  & > span:first-child{
    padding-top: 1rem;
    padding-right: 1rem;
    display: inline-block;
  }

`;

const Edited = styled.span`
display: ${props => (props.isEdited ? 'inline' : 'none') };
font-size: 1rem;`;

const StyledEditComment = styled(EditComment)`
  grid-area: 2/2/3/3;
`;

const Menu = styled.div`
  grid-area: 1/3/2/4;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
`;

const Button = styled.button`
  user-select: none;
  border: 0;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 2.8rem;
  overflow-x: hidden;
  padding: 0 2.4rem;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 1.5rem;
`;

const List = styled.div`
  display: flex;
  flex-flow: column wrap;
  border: 0.1rem solid black;
  grid-area: 2/3/2/4;
  position: relative;
  height: 10rem;
  z-index: 0;
  background-color: #F9F9F9;
  border-radius: .5rem;
`;




export default Comment;
