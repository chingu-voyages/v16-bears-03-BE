import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Message from './components/message/Message';
import axios from 'axios';

import AppContainer from './components/main/AppContainer';

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    height: 100%;
    font-family: 'Arimo', sans-serif;
    padding: 0;
    margin: 0;
  }
  #root {
    height: 100%;
    margin: 0;

    &>div{
    height: 100%;
    margin: 0;
        }
  }
  a {
    text-decoration: none;
  }
  button {  font-family: 'Arimo', sans-serif; }
`;

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8000';
}

const AppWrap = styled.div`
  position: absolute;
  top: 0px;
  background: rgb(44, 8, 82);
  width: 100%;
  height: 45%;
`;

const H1 = styled.h1`
  color: white;
  margin-top: 50px;
  margin-left: 10%;
  font-size: 3rem;
`;
const FormWrapper = styled.div`
  margin: 80px auto auto auto;
  width: 70%;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

function App() {
  const [triggerRerender, setTriggerRerender] = useState(1);
  const [newUser, setNewUser] = useState(false);
  const [message, setMessage] = useState([]);

  function set_new_user(value) {
    setNewUser(value);
  }

  function set_message(msg) {
    setMessage(msg);

    //message will be disappeared after 7 seconds
    setTimeout(() => {
      setMessage([]);
    }, 7000);
  }

  useEffect(() => {
    if (localStorage.loggedIn) {
      set_new_user();
    }
  }, [triggerRerender]);

  return (
    <div>
      <GlobalStyles />
      {!localStorage.loggedIn ? (
        <AppWrap>
          <H1>Slack Clone</H1>
          <Message message={message} />
          <GlobalStyles />
          <FormWrapper>
            {!newUser ? (
              <Login
                set_new_user={set_new_user}
                set_message={set_message}
                onChange={setTriggerRerender}
              />
            ) : (
              <Register
                set_new_user={set_new_user}
                set_message={set_message}
                onChange={setTriggerRerender}
              />
            )}
          </FormWrapper>
        </AppWrap>
      ) : (
        <AppContainer />
      )}
    </div>
  );
}

export default App;
