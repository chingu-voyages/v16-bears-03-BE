import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Hr } from '../../../theme/theme.js';
import Message from '../../message/Message';
import { MessageContext } from '../../../App';
import { AppContext } from '../AppContainer';
import Channels from './Channels';
import AllUsers from './AllUsers';
import CurrentUser from './CurrentUser';

function Sidebar() {
  const [sidebar, setToggleSidebar] = useState(false);
  const [allChannels, setAllChannels] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const socket = useContext(AppContext);
  let errorMessage = useContext(MessageContext);

  useEffect(() => {
    const getChannels = async () => {
      setIsLoading(true);

      try {
        // Get all channels
        const result = await axios('/api/channels', {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        });
        setAllChannels(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        errorMessage.set_message([{ msg: 'Unable to get channels.' }]);
        setIsError(true);
      }
    };
    getChannels();
  }, [errorMessage]);

  //socket listeners on Sidebar
  useEffect(() => {
    socket.emit('activeUser', { userId: localStorage.userId, clientSocket: socket.id });

    socket.on('updateUserActivity', activeUsers => {
      setActiveUsers(
        activeUsers.map(({ userId }) => {
          return userId;
        }),
      );
    });

    socket.on('updateUser', ({ id, name }) => {
      setAllChannels(prev => {
        return prev.map(channel => {
          channel.users.forEach(user => {
            if (user.id === id) {
              if (name) {
                user.name = name;
              }
            }
          });
          return channel;
        });
      });
    });

    socket.on('addUserToChannel', ({ user, channelId }) => {
      setAllChannels(prev => {
        return prev.map(channel => {
          if (channel.id === channelId) {
            channel.users.push(user);
            return channel;
          } else {
            return channel;
          }
        });
      });
    });

    socket.on('deleteUser', id => {
      setAllChannels(prev => {
        return prev.map(channel => {
          channel.users = channel.users.filter(user => {
            return user.id !== id;
          });
          return channel;
        });
      });
    });
  }, [socket]);

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
      <SidebarContainer className={sidebar ? 'show' : ''}>
        <CurrentUser activeUsers={activeUsers} />
        <Hr />
        {isLoading && <div>Loading...</div>}
        {isError ? (
          <Message message={errorMessage.message} />
        ) : (
          <>
            <Channels allChannels={allChannels} />
            {/* TODO: Choose selected channel / Harcoded General Channel */}
            <AllUsers
              allUsersInChannel={allChannels && allChannels[0].users}
              activeUsers={activeUsers}
            />
          </>
        )}
      </SidebarContainer>
    </Aside>
  );
}

const Aside = styled.aside`
  height: 100vh;
  background: rgb(44, 8, 82);

  @media screen and (max-width: 600px) {
    position: absolute;
    z-index: 100;
  }
`;

const SidebarContainer = styled.section`
  width: 22rem;
  height: 100vh;
  color: white;
  font-size: 1.5rem;
  overflow-y: hidden;

  h3 {
    margin-left: 2rem;
  }

  ul.channels {
    height: 20vh;
    margin-bottom: 2rem;
  }

  ul {
    margin-top: 2rem;
    height: 50vh;
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

const SidebarButton = styled.span`
  display: none;
  position: fixed;
  top: 1.3rem;
  left: 1.3rem;
  background-color: #2c0852;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
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
    left: 19.3rem;
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
