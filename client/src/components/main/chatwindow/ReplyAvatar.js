import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';

function ReplyAvatar({ thread }) {
  const [replyavatar, setReplyAvatar] = useState([]);

  useEffect(() => {
    let responseUsers = thread.map(info => {
      return info.user_id;
    });

    let UniqueUsers = [...new Set(responseUsers)];
    var UniqueUserinfos = [];
    for (let i = 0; i < UniqueUsers.length; i++) {
      let [info] = thread.filter(user => {
        return user.user_id === UniqueUsers[i];
      });
      UniqueUserinfos.push(info);
    }
    setReplyAvatar(UniqueUserinfos);
  }, [thread]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {replyavatar.length > 0 &&
        replyavatar.map(avatar => {
          return <Avatar key={avatar.user_id} avatar={avatar} />;
        })}
    </div>
  );
}

export default ReplyAvatar;
