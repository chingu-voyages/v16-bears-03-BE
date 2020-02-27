import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import User from './user/User';
import { Hr } from '../../../theme/theme.js';

const Aside = styled.aside`
  width: 22rem;
  height: 100vh;
  background: rgb(44, 8, 82);
  color: white;
  font-size: 1.5rem;

  ul {
    margin-top: 20rem;
    height: 75%;
    width: 100%;
    overflow-y: scroll;
    scrollbar-color: white rgb(44, 8, 82);
    scrollbar-width: thin;

    &::-webkit-scrollbar-track {
      -webkit-appearance: none;
    }
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      -webkit-appearance: none;
      border: 0.1rem solid black;
      background-color: white;
    }

    li {
      margin-bottom: 1rem;
      list-style-type: none;
      max-width: 15rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;


/**
 * Set the active dot to green if user is online
 */
const Active = styled.i`
  position: relative;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: ${props => (props.isActive ? '#2BAC76' : 'grey')};
  border-radius: 50%;
  margin-right: 0.5rem;
  `

const UserLink = styled.div`
  display: flex;
  justify-content: start;
  &:hover {
    background: rgb(56, 9, 105);
    cursor: pointer;
    color: gray;
  }
`;
const P = styled.p`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: rgb(16, 92, 44);
  margin: auto 1rem auto 2rem;
`;

function Sidebar() {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userWindow, setUserWindow] = useState(false);
  const [logedinUser, setLogedinUser] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${localStorage.userId}`, {
        headers: { authorization: `bearer ${localStorage.authToken}` },
      })
      .then(res => {
        setLogedinUser(res.data.name);
        setImageUrl(res.data.userImage);
      })
      .catch(err => console.error('Unable to get the user'));
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);

      try {
        // Get all users
        const result = await axios('/api/users', {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        });

        setAllUsers(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Unable to get users. ', error);
        setIsError(true);
      }
    };
    getUsers();
  }, []);

  return (
    <Aside>
      <UserLink onClick={() => setUserWindow(true)}>
        <P></P>
        <p>{logedinUser}</p>
      </UserLink>
      {userWindow && <User logedinUser={logedinUser} imageUrl={imageUrl} />}
      <Hr />
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <div>Something went wrong.</div>
      ) : (
        <ul>
          {allUsers &&
            allUsers.map(user => {
              // TODO: Set isActive to true is the user is online
              return (
                <li key={user.id}>
                  <Active isActive={false}></Active>
                  {user.name}
                </li>
              );
            })}
        </ul>
      )}
    </Aside>
  );
}

export default Sidebar;
