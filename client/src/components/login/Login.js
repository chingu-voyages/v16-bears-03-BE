import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Label, Input, Button } from './../../theme/theme.js';
import axios from 'axios';

const H2 = styled.h2`
  text-align: center;
  font-size: 2.2rem;
`;

const P = styled.p`
  margin-left: 25%;
  font-size: 12px;
  &:hover {
    text-decoration-color: gray;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const FormWrap = styled.div`
  margin-top: 30px;
  margin-left: 25%;
`;

function Login(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function submitLoginForm(e) {
    e.preventDefault();
    const loginUser = { email, password };

    axios
      .post('api/users/login', loginUser)
      .then(res => {
        const jwt = res.data.authToken;
        const user = res.data.user; //including id,name and email
        {
          /* Todo: pass user info to user component and app compoent*/
        }
        props.set_LoggedUser(true);
      })
      .catch(err => props.set_message([{ msg: 'Incorrect email or password' }]));
  }

  return (
    <Form background="white" onSubmit={submitLoginForm}>
      <H2>Login </H2>
      <FormWrap>
        <Label htmlFor="email">
          Email:
          <br />
          <Input
            type="email"
            id="email"
            title="Please enter an email address."
            onChange={e => setEmail(e.target.value)}
            required
          />
          <br />
        </Label>

        <Label htmlFor="password">
          Password:
          <br />
          <Input
            type="password"
            id="password"
            pattern=".{6,}"
            title="6 characters or more is required."
            onChange={e => setPassword(e.target.value)}
            required
          />
          <br />
        </Label>

        <Button background="purple" type="submit">
          Sign In
        </Button>
      </FormWrap>
      <hr />
      <P onClick={() => props.set_new_user(true)}>Register</P>
    </Form>
  );
}

export default Login;
