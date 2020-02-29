import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comment from './Comment';
import { ChatContext } from './ChatWindow';

/*
Requests all comments from database and renders to screen when component first loads and ChatWindow state changes
*/

//keeps overflow scroll at the bottom of container

const scrollToBottom = ref => {
  ref.current.scrollTop = ref.current.scrollHeight;
};

const ViewComments = props => {
  const refContainer = useRef(null);
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { chatState } = useContext(ChatContext);

  //triggers when ChatWindow state changes
  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/comments', {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        });
        setAllComments(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Unable to get comments', error);
        setIsError(true);
      }
    };

    getComments();
  }, [chatState]);

  useEffect(() => {
    if (chatState.newComment) {
      scrollToBottom(refContainer);
    }
  });

  return (
    <Wrapper ref={refContainer}>
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <div>"Something Went Wrong"</div>
      ) : (
        allComments.map(comment => {
          return (
            <Comment
              id={comment._id}
              key={comment._id}
              userImage={comment.userImage}
              name={comment.user}
              date={comment.date}
              text={comment.text}
              isEdited={comment.isEdited}
              user_id={comment.user_id}
              refContainer={refContainer}
            ></Comment>
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow: auto;
  border-top: 0.1rem solid black;
  padding: 1rem 0.5rem;

  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    border: 0.01rem solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.7rem;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: 0.1rem solid #919191;
    background: #919191;
    border-radius: 1rem;
  }
`;

export default ViewComments;
