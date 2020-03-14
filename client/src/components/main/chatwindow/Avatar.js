import React, { useEffect } from 'react';
import { ThreadAvatar } from '../thread/thread.style';
import createJdention from './../sidebar/user/createJdenticon';

function Avatar({ avatar }) {
  useEffect(() => {
    const cssid = avatar.user_id + avatar._id;
    createJdention(avatar.userImage, avatar.user_id, cssid);
  }, [avatar]);

  return (
    <ThreadAvatar type="small" id={avatar.user_id + avatar._id} title={avatar.user}></ThreadAvatar>
  );
}

export default Avatar;
