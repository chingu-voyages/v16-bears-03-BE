import styled from 'styled-components';

const Button = styled.button`
  width: 68%;
  height: 35px;
  margin: 20px auto;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    color: ${props => (props.background === 'purple' ? 'black' : 'white')};
    background: rgb(191, 187, 191);
  }
  ${props => {
    if (props.background === 'purple') {
      return `background:rgb(44, 8, 82);
                color:white`;
    }
  }};
`;

const SmallButton = styled.button`
  background: rgb(44, 8, 82);
  width: 45%;
  height: 25px;
  font-size: 15px;
  cursor: pointer;
  color: white;
  ${props => {
    if (props.background === 'white') {
      return `background:white;
            color:black;
            border:1px solid rgb(44, 8, 82);
            `;
    }
  }}
`;

const Form = styled.form`
  background: white;
  color: black;
  width: 350px;
  height: 400px;
  margin: 0 auto;
  border-radius: 5%;
  border: 1px solid rgb(44, 8, 82);
  @media (max-width: 480px) {
    width: 300px;
  }
  ${props => {
    if (props.form === 'register') {
      return `background:rgb(44, 8, 82);
                color:white;
                border:1px solid white;
                height:450px;
        `;
    }
  }}
`;
const Input = styled.input`
  width: 65%;
  height: 25px;
  margin: 3px auto 12px auto;
  ${props => {
    if (props.id === 'userinput') {
      return `height:35px;
            width:120px;
            font-size:1.5rem;
            border:2px solid lightblue;`;
    }
    if (props.id === 'urlinput') {
      return `height:30px;
              width:210px;
              border:2px solid lightblue;`;
    }
  }}
`;

const Label = styled.label`
  font-size: 15px;
`;
const Hr = styled.hr`
  color: black;
  border-top: 0.1px;
  margin: 0.5rem;
  margin: 0px;
`;

const Div = styled.div`
  z-index: 1;
  background: white;
  position: absolute;
  height: 350px;
  width: 280px;
  top: 10px;
  left: 10px;
  border: 1px solid gray;
  border-bottom: 5rem solid gray;
  color: black;
  padding: 2rem;
  ${props => {
    if (props.type === 'image') {
      return `border-bottom: 1px solid gray;
              top:349px;   
              left:-1px; 
              height:380px          
              `;
    }
  }}
`;

export { Button, SmallButton, Form, Input, Label, Hr, Div };
