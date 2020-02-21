import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comment from './Comment';

/*
Requests all comments from database and renders to screen when component first loads and newComment prop changes
*/

const jwt = '';
const config = { headers: { authorization: `bearer ${jwt}` } };

//keeps overflow scroll at the bottom of container

const scrollToBottom = ref => {
  ref.current.scrollTop = ref.current.scrollHeight;
};

const ViewComments = props => {
  const refContainer = useRef(null);

  const { newComment, setNewComment } = props;
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/comments', config);

        setAllComments(result.data);
        setNewComment(false);
        setIsLoading(false);
      } catch (error) {
        console.error('Unable to get comments', error);
        setIsError(true);
      }
    };

    getComments();
  }, [setNewComment, newComment]);

  useEffect(() => {
    scrollToBottom(refContainer);
  });

  return (
    <Wrapper ref={refContainer}>
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <div>"Something Went Wrong"</div>
      ) : (
        allComments.map(comment => {
          return <Comment name={comment.user} date={comment.date} text={comment.text}></Comment>;
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
