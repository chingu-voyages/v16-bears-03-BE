import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  z-index: 1;
  position: absolute;
  top: 80px;
  right: 10%;
  color: red;
  font-size: 12px;
`;

function Message(props) {
  return (
    <Div>
      {props.message.map((msg, index) => {
        return <p key={index}>{msg.msg}</p>;
      })}
    </Div>
  );
}

export default Message;
