import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Label, Input, Button } from './../../theme/theme.js';
import axios from 'axios';

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
`;

const FormWrap = styled.div`
  margin-top: 30px;
  margin-left: 25%;
`;

function Register(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function subRegisterForm(e) {
    e.preventDefault();
    const newUser = { name, password, email };

    axios
      .post('/api/users/register', newUser)
      .then(res => {
        console.log(res.data);
        const user = { password, email };
        axios
          .post('/api/users/login', user)
          .then(res => console.log(res.data))
          .catch(err => props.set_message(err.response.data.errors));
      })
      .catch(err => {
        console.log(err.response.data.errors);
        props.set_message(err.response.data.errors);
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
            name="name"
            id="name"
            onChange={e => setName(e.target.value)}
            required
          />
          <br />
        </Label>
        <Label htmlFor="password">
          Password:
          <br />
          <Input
            type="text"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <br />
        </Label>
        <Label htmlFor="email">Email:</Label>
        <br />
        <Input
          type="text"
          name="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />
        <Button type="submit">Sign Up</Button>
      </FormWrap>
      <hr />
      <P onClick={() => props.set_new_user(false)}>Sign in</P>
    </Form>
  );
}

export default Register;
