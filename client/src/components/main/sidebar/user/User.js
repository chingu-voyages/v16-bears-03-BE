import React, { useEffect, useReducer, useState } from 'react';
import createJdention from './createJdenticon';
import UserName from './UserName';
import Image from './Image';
import styled from 'styled-components';
import { Hr } from '../../../../theme/theme';

//change inside the sidebar.js theme.js->input

const Div = styled.div`
  z-index: 1;
  background: white;
  position: absolute;
  height: 350px;
  width: 280px;
  top: 1.5rem;
  left: 1.5rem;
  border: 1px solid gray;
  border-bottom: 5rem solid gray;
  color: black;
  padding: 2rem;
`;

const Profile = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 1rem;
  & > div {
    margin-right: 2rem;
  }
`;

const ProfileImage = styled.div`
  & > svg,
  img {
    width: 6rem;
    height: 6rem;
    border: 2px solid lightgray;
  }
`;

const Ol = styled.ol`
  font-size: 1.5rem;
  padding: 0.8rem;
  margin: 0 auto;
  &:hover {
    background: rgb(44, 8, 82);
    cursor: pointer;
    color: white;
  }
`;

const Name = styled.div`
  margin: auto 1rem;
`;

function User(props) {
  const initialState = {
    userid: localStorage.userId,
    username: props.logedinUser,
    jwt: localStorage.authToken,
    imageurl: props.imageUrl,
    //updated: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_USERNAME':
        return { ...state, username: action.name };
      case 'CHANGE_IMAGEURL':
        return { ...state, imageurl: action.imageurl };
      default:
        return initialState;
    }
  }

  const [userstate, dispatch] = useReducer(reducer, initialState);
  const [changeUserName, SetChangeUserName] = useState(false);
  const [openImageWindow, SetOpenImageWindow] = useState(false);
  const container = React.createRef();

  useEffect(() => {
    createJdention(initialState.imageurl, initialState.userid);
  }, [initialState.imageurl, initialState.userid]);

  function handleClickOutside(e) {
    if (container.current && !container.current.contains(e.target)) {
      props.setUserWindow(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <Div ref={container}>
      <Profile>
        <ProfileImage id={initialState.userid}></ProfileImage>
        <Name>
          <b>
            {!changeUserName ? (
              userstate.username
            ) : (
              <UserName
                username={userstate.username}
                dispatch={dispatch}
                SetChangeUserName={SetChangeUserName}
              />
            )}
          </b>
        </Name>
      </Profile>
      <Hr />
      <div>
        <Ol onClick={() => SetChangeUserName(true)}>Change Username</Ol>
        <Ol onClick={() => SetOpenImageWindow(true)}>Update Profile Image</Ol>
        <Ol>Delete Account</Ol>
        <Ol>Logout</Ol>
      </div>
      {openImageWindow && <Image />}
    </Div>
  );
}

export default User;
