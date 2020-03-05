import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  color: red;
  font-size: 12px;
`;

function Message(props) {
  return (
    <Div>
      {props.message.map((msg, index) => {
        return <span key={index}>{msg.msg}</span>;
      })}
    </Div>
  );
}

export default Message;
