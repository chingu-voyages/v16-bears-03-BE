import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MessageContext } from '../../../App';
import Message from '../../message/Message';

function Channels() {
  const [allChannels, setAllChannels] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <Message message={errorMessage.message} />
      ) : (
        <div>
          <h3>Channels</h3>
          <ul>
            {allChannels &&
              allChannels.map(channel => {
                return (
                  <li key={channel.id} title={channel.name}>
                    # {channel.name}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Channels;
