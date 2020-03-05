import React, { useEffect } from 'react';
import createJdention from './../sidebar/user/createJdenticon';
import { ThreadAvatar, Title, ThreadInfo } from './thread.style';
import { formatDate } from '../chatwindow/Comment';

function ThreadTitle({ threadinfo }) {
  //Object { id: "5e5f70e18193e300177290d3", name: "pppppp", date: "2020-03-04T09:12:01.569Z", text: "actually it is", user_id: "5e5f52095b2d5500170c342d",userImage:null }

  useEffect(() => {
    createJdention(threadinfo.userImage, threadinfo.user_id, 'thread_owner_image');
  }, [threadinfo.userImage, threadinfo.user_id]);

  return (
    <Title>
      <ThreadAvatar id="thread_owner_image"></ThreadAvatar>
      <ThreadInfo>
        <div>
          <b style={{ marginRight: '1rem', fontSize: '1.5rem' }}>{threadinfo.name}</b>
          <span style={{ fontSize: '1rem', color: 'gray' }}>{formatDate(threadinfo.date)}</span>
        </div>
        <div style={{ fontSize: '1.5rem' }}>{threadinfo.text}</div>
      </ThreadInfo>
    </Title>
  );
}

export default ThreadTitle;
