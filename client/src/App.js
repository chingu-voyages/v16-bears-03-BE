import React,{useState} from 'react';
import styled,{createGlobalStyle} from 'styled-components';

import Login from './compontents/login/Login';
import Register from './compontents/register/Register';

const GlobalStyles=createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Lemonada|Montserrat|Overpass&display=swap");
body{
  font-family:'Lemonada', cursive;
}
`


const AppWrap=styled.div`
position:absolute;
top:0px;
background:rgb(44, 8, 82);
width:100%;
height:40%;
`

const H1=styled.h1`
color:white;
margin-top:50px;
margin-left:10%;
`
const FormWrapper=styled.div`
display:flex;
flex-wrap:wrap;
margin:80px auto auto auto;
width:70%;
`


function App() {
  const [name,setName]=useState('');
  const [status,setStatus]=useState(false);

  return (
    <AppWrap>
      <H1>Slack Clone</H1>
      <GlobalStyles />
      <FormWrapper>
        <Login />
        <Register />
      </FormWrapper>      
    </AppWrap>
  );
}

export default App;
