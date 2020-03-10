import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import createJdention from '../sidebar/user/createJdenticon';
import { ThreadAvatar, Title, ThreadInfo, Menu } from './thread.style';
import { formatDate } from '../chatwindow/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '../../../theme/theme';
import EditThread from './EditThread';
import axios from 'axios';

function Thread({ threadinfo, dispatch }) {
  const [hidden, setHidden] = useState(true);
  const [editThread, setEditThread] = useState(false);
  const menuContainer = React.useRef();

  function handleClickOutside(e) {
    if (menuContainer.current && !menuContainer.current.contains(e.target)) {
      setHidden(true);
    }
  }

  useEffect(() => {
    const cssid = threadinfo.parent_id === undefined ? 'title_image' : threadinfo.id;
    createJdention(threadinfo.userImage, threadinfo.user_id, cssid);
  }, [threadinfo]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  function deleteThread() {
    const confirm = window.confirm(
      'Are you sure you want to delete this thread? This cannot be undone.',
    );
    if (confirm === true) {
      axios
        .delete(`/api/comments/${threadinfo.id}`, {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        })
        .then(res => {
          dispatch({ type: 'DELETE_THREAD', id: threadinfo.id });
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
    setHidden(true);
  }

  function updateThread(text) {
    axios
      .patch(
        `/api/comments/${threadinfo.id}`,
        { text },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      )
      .then(res => {
        dispatch({ type: 'EDIT_THREAD', data: { text, id: threadinfo.id } });
        setEditThread(false);
      })
      .catch(err => console.log(err.response.data));
  }

  return (
    <Title id={threadinfo.parent_id === undefined ? 'title' : 'notatitle'}>
      <ThreadAvatar
        id={threadinfo.parent_id === undefined ? 'title_image' : threadinfo.id}
      ></ThreadAvatar>
      <ThreadInfo>
        <div>
          <b style={{ marginRight: '1rem', fontSize: '1.5rem' }}>{threadinfo.name}</b>
          <span style={{ fontSize: '1rem', color: 'gray' }}>{formatDate(threadinfo.date)}</span>
        </div>

        {editThread ? (
          <EditThread
            text={threadinfo.text}
            setEditThread={setEditThread}
            updateThread={updateThread}
          />
        ) : (
          <div style={{ fontSize: '1.5rem', width: '350px', wordWrap: 'break-word' }}>
            {threadinfo.text}
            <span style={{ fontSize: '0.8rem', color: 'gray' }}>
              {threadinfo.isEdited && '  (edited)'}
            </span>
          </div>
        )}

        {threadinfo.user_id === localStorage.userId && (
          <div>
            <Button
              id={threadinfo.parent_id === undefined ? 'button' : 'edit_delete_BTN'}
              onClick={() => setHidden(false)}
            >
              <Tooltip>Edit/Delete</Tooltip>
              <FontAwesomeIcon icon={faEllipsisV} size="1x" style={{ color: '#555' }} />
            </Button>

            {!hidden && (
              <Menu ref={menuContainer}>
                <div onClick={deleteThread}>Delete</div>
                <div
                  onClick={() => {
                    setEditThread(true);
                    setHidden(true);
                  }}
                >
                  Edit
                </div>
              </Menu>
            )}
          </div>
        )}
      </ThreadInfo>
    </Title>
  );
}

const Button = styled.span`
  visibility: hidden;
  ${props => {
    if (props.id === 'edit_delete_BTN') {
      return `
      visibility: visible;
      position: absolute;
      padding:0.5rem;
      top: 3rem;
      right: 4rem;
      &:hover{
        background:white;
        &>div{
          visibility:visible;
        }
      }
    `;
    }
  }}
`;

export default Thread;
