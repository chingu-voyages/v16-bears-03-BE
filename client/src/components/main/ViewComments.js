import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comment from './Comment';

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNGRlZWYyOWI3MDk0MmUzODU5MTg2MyIsIm5hbWUiOiJtZXJyeSIsImVtYWlsIjoibWVycnlAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUTY0LkdENzFBODBWdS9kV3dxY25lLno0ZDJzUTlhenV0Vm9Hby5QRkk2SmpKdE5TYkVEL2kiLCJfX3YiOjB9LCJpYXQiOjE1ODIyMTIxNTcsImV4cCI6MTU4MjgxNjk1Nywic3ViIjoibWVycnkifQ.Tz9qXAZdn6pPLotAFuUTkiND0AvRbR1E0wObvmF3Xy4';
const config = { headers: { authorization: `bearer ${jwt}` } };

const ViewComments = props => {
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/comments', config);

        setAllComments(result.data);

        setIsLoading(false);
      } catch (error) {
        console.error('Unable to get comments', error);
        setIsError(true);
      }
    };
    getComments();
  }, []);

  return (
    <Wrapper>
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
  display: grid;
  grid-auto-rows: auto;
  grid-auto-columns: auto;
  grid-row-gap: 7px;
  overflow: auto;

  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    border: 0.01rem solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.4rem;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: 1px solid #2c0852;
    background: #2c0852;
  }
`;

export default ViewComments;
