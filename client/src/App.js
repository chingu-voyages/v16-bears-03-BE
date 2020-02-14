import React,{useState} from 'react';
import styled from 'styled-components';
import Login from './compontents/login/Login';
import Register from './compontents/register/Register';
import './App.css';

const H1=styled.h1`
color:rgb(44, 8, 82);
margin-left:10%;
`

function App() {
  const [user,setUser]=useState('');
  const [status,setStatus]=useState(false);

  return (
    <div className="App">
      <H1>Slack Clone</H1>
      <div>
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default App;
