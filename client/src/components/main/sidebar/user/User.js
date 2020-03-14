import React, { useEffect, useReducer, useState, useContext } from 'react';
import axios from 'axios';
import createJdention from './createJdenticon';
import UserName from './UserName';
import Image from './Image';
import styled from 'styled-components';
import { Div } from '../../../../theme/theme';
import { AppContext } from '../../AppContainer';

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
    username: props.loggedinUser,
    jwt: localStorage.authToken,
    imageurl: props.imageUrl,
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
  const container = React.useRef();
  const { socket } = useContext(AppContext);

  useEffect(() => {
    createJdention(userstate.imageurl, userstate.userid, 'smallimage');
  }, [userstate.imageurl, userstate.userid]);

  function handleClickOutside(e) {
    if (container.current && !container.current.contains(e.target)) {
      props.setUserWindow(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  function deleteAccount() {
    const confirm = window.confirm('Do you really want to delete your account?');

    if (confirm === true) {
      axios
        .delete(`/api/users/${userstate.userid}`, {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        })
        .then(res => {
          localStorage.clear();
          window.location.href = '/';
        })
        .catch(err => console.log(err.response.data));
    }
  }

  return (
    <Div ref={container}>
      <Profile>
        <ProfileImage id="smallimage"></ProfileImage>

        <Name>
          <b>
            {!changeUserName ? (
              userstate.username
            ) : (
              <UserName
                username={userstate.username}
                dispatch={dispatch}
                SetChangeUserName={SetChangeUserName}
                setLoggedinUser={props.setLoggedinUser}
              />
            )}
          </b>
        </Name>
      </Profile>
      <hr />

      <div>
        <Ol onClick={() => SetChangeUserName(true)}>Change Username</Ol>
        <Ol onClick={() => SetOpenImageWindow(true)}>Update Profile Image</Ol>

        {props.activeUsers.indexOf(localStorage.userId) !== -1 ? (
          <Ol
            onClick={() => {
              socket.emit('setAwayUser', { userId: localStorage.userId, clientSocket: socket.id });
            }}
          >
            Set Yourself To Away
          </Ol>
        ) : (
          <Ol
            onClick={() => {
              socket.emit('setActiveUser', {
                userId: localStorage.userId,
                clientSocket: socket.id,
              });
            }}
          >
            Set Yourself To Active
          </Ol>
        )}

        <Ol onClick={deleteAccount}>Delete Account</Ol>
        <Ol
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
        >
          Logout
        </Ol>
      </div>

      {openImageWindow && (
        <Image
          dispatch={dispatch}
          SetOpenImageWindow={SetOpenImageWindow}
          image={userstate.imageurl}
          id={userstate.userid}
          setImageUrl={props.setImageUrl}
          imageurl={userstate.imageurl}
        />
      )}
    </Div>
  );
}

export default User;
