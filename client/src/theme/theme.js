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
  width: 40%;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
  color: white;
  margin-top: 1rem;
  border: 1px solid gray;
  &:hover {
    border: gray;
  }
  &:disabled {
    background: gray;
    border: 1px solid #999999;
    cursor: default;
    color: lightgray;
  }
  ${props => {
    if (props.background === 'white') {
      return `background:white;
            color:black;
            border:1px solid rgb(44, 8, 82);
            `;
    }
  }}
`;

const CloseButton = styled.button`
  font-size: 20px;
  color: darkgray;
  border: none;
  float: right;
  cursor: pointer;
  margin-bottom: 1.5rem;
  &:hover {
    color: black;
  }
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
  @media (max-width: 480px) {
    top: 0px;
    left: 0px;
  }
  ${props => {
    if (props.type === 'image') {
      return `border-bottom: 1px solid gray;
              top:349px;   
              left:-1px; 
              height:420px ;
              @media (max-width:480px){
                 top:349px;
                 left:-1px;
                }         
              `;
    }
  }}
`;

const Tooltip = styled.div`
  visibility: hidden;
  width: 90px;
  background: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  z-index: 1;
  padding: 5px 0;
  position: absolute;
  left: 50%;
  bottom: 125%;
  margin-left: -45px;
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    &:hover {
      visibility: visible;
    }
  }
`;
export { Button, SmallButton, CloseButton, Tooltip, Form, Input, Label, Hr, Div };
