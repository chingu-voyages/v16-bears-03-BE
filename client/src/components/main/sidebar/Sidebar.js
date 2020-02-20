import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Aside = styled.aside`
  width: 22rem;
  height: 100vh;
  background: rgb(44, 8, 82);
  color: white;
  font-size: 2rem;
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

      /**
       * TODO: Remove jwt and config variables after login implementation
       *
       * Temporary ardcoded token for this user
       * "email": "idgfgno@yahoo.com",
       * "password": "123456"
       */
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNGUwMWVlZTczMmVmMDE3Y2E0ZjhhMCIsIm5hbWUiOiJJZ05vIiwiZW1haWwiOiJpZGdmZ25vQHlhaG9vLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEM3MXQ0SS9rLjlKOWZ6VnhOaXk1LmV6bnF2ZlhvWlJRNG82dVZCc1YvWEdsSllQZElFUERxIiwiX192IjowfSwiaWF0IjoxNTgyMTcxNDA4LCJleHAiOjE1ODI3NzYyMDgsInN1YiI6IklnTm8ifQ.ZcSy5dBxBuFBSv5KLfQvs622ay1sPnrau3RPkzu3Qbg';
      const config = {
        headers: { authorization: `bearer ${jwt}` },
      };

      try {
        // Get all users
        const result = await axios('/api/users', config);

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
