import React,{useState} from 'react';
import styled,{createGlobalStyle} from 'styled-components';
import Login from './compontents/login/Login';
import Register from './compontents/register/Register';

const GlobalStyles=createGlobalStyle`
body{
  font-family: 'Arimo', sans-serif;
}
`


const AppWrap=styled.div`
position:absolute;
top:0px;
background:rgb(44, 8, 82);
width:100%;
height:45%;
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
@media (max-width:480px){
  width:90%;
}
`


function App() {
  const [name,setName]=useState('');
  const [status,setStatus]=useState(false);
  const [newUser,setNewUser]=useState(false);

function set_new_user(value){
  setNewUser(value)
}

  return (
    <AppWrap>
      <H1>Slack Clone</H1>
      <GlobalStyles />
      <FormWrapper>
        {!newUser?<Login  set_new_user={set_new_user}   />:<Register set_new_user={set_new_user} />}        
      </FormWrapper>      
    </AppWrap>
  );
}

export default App;
