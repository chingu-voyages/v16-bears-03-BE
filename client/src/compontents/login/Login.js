import React, { useState } from 'react';
import styled from 'styled-components';
import Form from './../../theme/form';
import Label from './../../theme/label';
import Input from './../../theme/input';
import Button from './../../theme/button';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const H2=styled.h2`
    text-align:center;`

    const FormWrap=styled.div`
    margin-top:30px;
    margin-left:25%;
    `

    return (

            <Form background="white" >
                <H2 >Login </H2>
                <FormWrap>
                <Label htmlFor="name">Email:</Label><br />
                <Input type="text" name="name" id="name" required></Input><br />
                <Label htmlFor="password">Password:</Label><br />
                <Input type="text" name="password" id="password" required></Input><br />
                <Button background="purple" type="submit">Sign In</Button>
                </FormWrap>

            </Form>

    )
}

export default Login;
