import React, { useEffect } from 'react';
import styled from 'styled-components';

//Receives UTC date and returns time and date in local twelve-hour time

const formatDate = date => {
  const dateInLocalTime = new Date(date);

  const hours =
    dateInLocalTime.getHours() > 12 ? dateInLocalTime.getHours() - 12 : dateInLocalTime.getHours();
  const minutes =
    dateInLocalTime.getMinutes() < 10
      ? `0${dateInLocalTime.getMinutes()}`
      : dateInLocalTime.getMinutes();

  if (dateInLocalTime.getHours() > 12 && dateInLocalTime.getHours() < 24) {
    return `${dateInLocalTime.toDateString()} ${hours}:${minutes}pm`;
  } else {
    return `${dateInLocalTime.toDateString()} ${hours}:${minutes}am`;
  }
};

// Comment Component

const Comment = props => {
  const { id, name, date, text, user_id, userImage } = props;

  useEffect(() => {
    const script = document.createElement('script');

    const defaultUserImg = `jdenticon.toSvg('${user_id}', 200)`;
    const userSetImage = `"<img src='${userImage}' >"`;

    script.innerHTML = `var placeholder = document.getElementById("${id}"); placeholder.innerHTML = ${
      !userImage ? defaultUserImg : userSetImage
    }`;

    document.body.appendChild(script);
  });

  return (
    <Wrapper>
      <Avatar id={id} />

      <UserDateWrapper>
        <Name>{name}</Name>
        <Time>{formatDate(date)}</Time>
      </UserDateWrapper>

      <Text>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-column-gap: 1rem;
  width: 100%;
  flex-basis: 100%;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  grid-area: 1/1/3/2;
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  align-self: flex-start;
  margin-right: 0.25rem;

  & > svg,
  img {
    height: 3.6rem;
    width: 3.6rem;
  }
`;

const UserDateWrapper = styled.div`
  grid-area: 1/2/2/4;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Name = styled.div`
  font-size: 1.6rem;
  margin-right: 0.5rem;
  font-weight: 600;
`;

const Time = styled.div`
  font-size: 1.2rem;
`;

const Text = styled.div`
  grid-area: 2/2/3/3;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1c1d1c;
  margin-top: 0.5rem;
`;

export default Comment;
