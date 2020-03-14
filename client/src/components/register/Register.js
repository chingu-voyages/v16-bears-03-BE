import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Form, Label, Input, Button } from './../../theme/theme.js';
import axios from 'axios';
import Message from '../message/Message';
import { MessageContext } from '../../App';

const P = styled.p`
  margin-left: 25%;
  font-size: 12px;
  &:hover {
    text-decoration-color: gray;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 2.2rem;
`;

const FormWrap = styled.div`
  margin-top: 30px;
  margin-left: 25%;
`;

function Register(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  let errorMessage = useContext(MessageContext);

  function subRegisterForm(e) {
    e.preventDefault();
    const newUser = { name, password, email };

    axios
      .post('/api/users/register', newUser)
      .then(res => {
        const user = { password, email };
        axios
          .post('/api/users/login', user)
          .then(res => {
            localStorage.setItem('authToken', res.data.authToken);
            localStorage.setItem('userId', res.data.user.id);
            localStorage.setItem('loggedIn', true);
            props.onChange(Math.random());
          })
          .catch(err => {
            console.log(err);
            // errorMessage.set_message(err, true);
          });
      })
      .catch(err => {
        console.log(err);
        // errorMessage.set_message(err, true);
      });
  }

  return (
    <Form form="register" onSubmit={subRegisterForm}>
      <H2>Create an Account </H2>
      <FormWrap>
        <Label htmlFor="name">
          Username:
          <br />
          <Input
            type="text"
            id="name"
            pattern=".{6,15}"
            onChange={e => setName(e.target.value)}
            title="6 to 15 characters is required."
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
            onChange={e => setPassword(e.target.value)}
            title="6 characters or more is required."
            required
          />
          <br />
        </Label>

        <Label htmlFor="email">
          Email:
          <br />
          <Input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            title="Please enter an email address."
            required
          />
          <br />
        </Label>
        <Message message={errorMessage.message} />
        <Button type="submit">Sign Up</Button>
      </FormWrap>
      <hr />
      <P onClick={() => props.set_new_user(false)}>Sign in</P>
    </Form>
  );
}

export default Register;
