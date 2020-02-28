import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Sidebar() {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sidebar, setToggleSidebar] = useState(false);

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

  const toggleSidebar = () => {
    if (sidebar) {
      setToggleSidebar(false);
    } else {
      setToggleSidebar(true);
    }
  };

  return (
    <Aside>
      <SidebarButton onClick={toggleSidebar} className={sidebar ? 'show' : ''}>
        <i>&nbsp;</i>
      </SidebarButton>
      <UsersList className={sidebar ? 'show' : ''}>
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
      </UsersList>
    </Aside>
  );
}

const Aside = styled.aside`
  height: 100vh;
  background: rgb(44, 8, 82);
`;

const UsersList = styled.section`
  width: 22rem;
  height: 100vh;
  color: white;
  font-size: 1.5rem;
  overflow-y: hidden;

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

  @media screen and (max-width: 600px) {
    display: none;
    width: 18rem;

    ul {
      padding-left: 2rem;
    }

    &.show {
      display: block;
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
`;

const SidebarButton = styled.span`
  display: none;
  position: fixed;
  top: 1.3rem;
  right: 1.3rem;
  background-color: #2c0852;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  z-index: 2000;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: background-color 2s;

  i {
    position: relative;
    margin-top: 1.67rem;
    &,
    &::before,
    &::after {
      width: 1.5rem;
      height: 2px;
      background-color: white;
      display: inline-block;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      transition: all 0.5s;
    }

    &::before {
      top: -0.5rem;
    }
    &::after {
      top: 0.5rem;
    }
  }

  &.show {
    i {
      background-color: transparent;
    }

    i::before {
      transform: translateY(0.5rem) rotate(-135deg);
    }

    i::after {
      transform: translateY(-0.5rem) rotate(135deg);
    }
  }

  &:hover,
  &:active {
    background-color: rgba(44, 8, 82, 0.6);
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    display: initial;
  }
`;

export default Sidebar;
