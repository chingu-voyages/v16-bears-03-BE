import React from 'react';
import styled from 'styled-components';

function AllUsers(props) {
  return (
    <>
      <h3>Users</h3>
      <ul>
        {props.allUsersInChannel &&
          props.allUsersInChannel.map(user => {
            // TODO: Set isActive to true is the user is online
            return (
              <li key={user.id}>
            
                {(props.activeUsers.indexOf(user.id) !== -1)? (
                  <Active isActive={true} title="Active"></Active>
                ) : (
                  <Active isActive={false} title="Away"></Active>
                )}
                {user.name}
              </li>
            );
          })}
      </ul>
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
