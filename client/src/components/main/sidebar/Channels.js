import React from 'react';
import styled from 'styled-components';

function Channels(props) {
  const { allChannels, currentChannelID, setCurrentChannelID } = props;

  return (
    <>
      <h3>Channels</h3>
      <ul className="channels">
        {allChannels &&
          allChannels.map(channel => {
            return (
              <ChannelInSideBar
                key={channel.id}
                id={channel.id}
                title={channel.name}
                onClick={() => setCurrentChannelID(channel.id)}
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
