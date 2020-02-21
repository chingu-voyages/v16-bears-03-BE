import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './components/login/Login';
import Register from './components/register/Register';
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

axios.defaults.baseURL = 'http://localhost:8000';

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
`;
const FormWrapper = styled.div`
  margin: 80px auto auto auto;
  width: 70%;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

function App() {
  const [name, setName] = useState('');
  const [loggedUser, setLoggedUser] = useState(false);
  const [newUser, setNewUser] = useState(false);

  /**
   * TODO: Get if the user is logged in
   */
  function set_new_user(value) {
    setNewUser(value);
  }

  return (
    <div>
      <GlobalStyles />
      {/* TODO: If the user is not logged in, show login / register */}
      {!loggedUser ? (
        <AppWrap>
          <H1>Slack Clone</H1>
          <FormWrapper>
            {!newUser ? (
              <Login set_new_user={set_new_user} />
            ) : (
              <Register set_new_user={set_new_user} />
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
