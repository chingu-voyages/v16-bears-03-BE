import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Message from '../../message/Message';
import { MessageContext } from '../../../App';

function AllUsers() {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let errorMessage = useContext(MessageContext);

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
        errorMessage.set_message([{ msg: 'Unable to get users.' }]);
        setIsError(true);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <Message message={errorMessage.message} />
      ) : (
        <>
          <h3>Users</h3>
          <ul>
            {allUsers &&
              allUsers.map(user => {
                // TODO: Set isActive to true is the user is online
                return (
                  <li key={user.id} title={user.name}>
                    <Active isActive={false}></Active>
                    {user.name}
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </>
  );
}

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

export default AllUsers;
