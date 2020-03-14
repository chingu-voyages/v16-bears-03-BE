import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Channels(props) {
 
  const { allChannels, getChannels, appState, appDispatch,currentChannelID, setCurrentChannelID } = props;

  async function createNewChannel() {
    const name = prompt('Channel name?');
    const description = prompt('Channel description?');
    console.log('name: ', name, 'description: ', description);

    try {
      const result = await axios.post(
        '/api/channels',
        {
          name,
          description,
          user: localStorage.userId,
        },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      );

      getChannels();

      return result.data;
    } catch (error) {
      console.log('Create channel error: ', error);
    }
  }

  const setChannel = id => {
    let [channel] = allChannels.filter(channel => {
      return channel.id === id;
    });

    appDispatch({ type: 'SET_CHANNEL', channel: channel });
  };

  return (
    <>
      <Header>
        <h3>Channels</h3>
        <FontAwesomeIcon onClick={() => createNewChannel()} icon={faPlus} size="1x" />
      </Header>
      <ul className="channels">
        {allChannels &&
          allChannels.map(channel => {
            return (
              <ChannelInSideBar
                key={channel.id}
                id={channel.id}
                title={channel.name}
                onClick={() => {
                  setChannel(channel.id)
                  setCurrentChannelID(channel.id)
                }}
                currentChannel={appState.channel.id}
                currentChannel={currentChannelID}
              >
                # {channel.name}
              </ChannelInSideBar>
            );
          })}
      </ul>
    </>
  );
}

const Header = styled.header`
  h3 {
    display: inline-block;
  }

  svg {
    margin-left: 8rem;
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      color: rgba(255, 255, 255);
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    svg {
      margin-left: 6rem;
    }
  }
`;

const ChannelInSideBar = styled.li`
  margin-bottom: 1rem;
  list-style-type: none;
  max-width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${props =>
    props.id === props.currentChannel ? 'rgb(52, 70, 255, .5)' : 'none'};
  width: 100%;
  cursor: pointer;
`;

export default Channels;
