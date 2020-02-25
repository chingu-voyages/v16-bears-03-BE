import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Aside = styled.aside`
  width: 22rem;
  height: 100vh;
  background: rgb(44, 8, 82);
  color: white;
  font-size: 2rem;
  grid-area: 1/1/3/2;
  li {
    list-style-type: none;
  }
`;

function Sidebar() {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <div>Something went wrong.</div>
      ) : (
        <ul>
          {allUsers &&
            allUsers.map(user => {
              return <li key={user.id}>{user.name}</li>;
            })}
        </ul>
      )}
    </Aside>
  );
}

export default Sidebar;
