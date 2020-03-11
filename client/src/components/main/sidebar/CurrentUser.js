import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import User from './user/User';
import Message from '../../message/Message';
import { MessageContext } from '../../../App';

function CurrentUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userWindow, setUserWindow] = useState(false);
  const [logedinUser, setLogedinUser] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  let errorMessage = useContext(MessageContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/users/${localStorage.userId}`, {
        headers: { authorization: `bearer ${localStorage.authToken}` },
      })
      .then(res => {
        setIsLoading(false);
        setLogedinUser(res.data.name);
        setImageUrl(res.data.userImage);
      })
      .catch(err => {
        setIsLoading(false);
        setIsError(true);
        errorMessage.set_message([{ msg: 'Unable to get the user.' }]);
      });
  }, [logedinUser, imageUrl]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <Message message={errorMessage.message} />
      ) : (
        logedinUser && (
                 <UserLink onClick={() => setUserWindow(true)}>
        {(activeUsers.indexOf(localStorage.userId) !== -1)? (
                      <P isActive={true} title="Active"></P>
                    ) : (
                      <P isActive={false} title="Away"></P>
                    )}
          <p>{logedinUser}</p>
        </UserLink>))}
        {userWindow && (
          <User
            logedinUser={logedinUser}
            imageUrl={imageUrl}
            setLogedinUser={setLogedinUser}
            setImageUrl={setImageUrl}
            setUserWindow={setUserWindow}
            activeUsers={activeUsers}
          />
        )}
    </>
  );
}

const UserLink = styled.div`
  display: flex;
  justify-content: start;
  &:hover {
    background: rgb(56, 9, 105);
    cursor: pointer;
    color: gray;
  }

  @media screen and (max-width: 600px) {
    ul {
      padding-left: 2rem;
    }
  }
`;

const P = styled.p`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${props => (props.isActive ? '#2BAC76' : 'grey')};
  margin: auto 0.5rem auto 4rem;

  @media screen and (max-width: 600px) {
    margin-left: 2rem;
  }
`;

export default CurrentUser;
