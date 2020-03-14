import React, { useEffect, useContext } from 'react';
import { ThreadAvatar } from '../thread/thread.style';
import createJdention from './../sidebar/user/createJdenticon';
import { AppContext } from '../AppContainer';


function Avatar({ avatar }) {
  const {  appState } = useContext(AppContext);

  useEffect(() => {
    const cssid = avatar.user_id + avatar._id;
    createJdention(avatar.userImage, avatar.user_id, cssid);
  }, [avatar, appState]);

  return (
    <ThreadAvatar type="small" id={avatar.user_id + avatar._id} title={avatar.user}></ThreadAvatar>
  );
}

export default Avatar;
