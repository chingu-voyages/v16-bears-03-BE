import React from 'react';
import styled from 'styled-components';

const Comment = props => {
  const { name, date, text} = props;
  const dateInLocalTime = new Date(date).toString()

  
  return (
    <Wrapper>
        <Avatar></Avatar>
      <UserDateWrapper>
        <Name>{name}</Name>
  <Time>{dateInLocalTime}</Time>
      </UserDateWrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  width: 80%;
`;

const Avatar = styled.div`
grid-area: 1/1/3/2;
background-color: pink;
border-radius: 50%;
width: 36px;
height: 36px;
align-self: center;
margin-right: .25rem;`

const UserDateWrapper = styled.div`
  grid-area: 1/2/2/4;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Name = styled.div`
  font-size: 15px;
  margin-right: .5rem;
  font-weight: 600;
`;

const Time = styled.div`
  font-size: 10px;
`;

const Text = styled.div`
  grid-area: 2/2/3/3;
  font-size: 15px;
`;



export default Comment;
