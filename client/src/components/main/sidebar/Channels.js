import React from 'react';

function Channels(props) {
  return (
    <>
      <h3>Channels</h3>
      <ul className="channels">
        {props.allChannels &&
          props.allChannels.map(channel => {
            return (
              <li key={channel._id} title={channel.name}>
                # {channel.name}
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default Channels;
