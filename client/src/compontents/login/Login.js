import React, { useState } from 'react';
import styled from 'styled-components';
import Form from './../../theme/form';
import Label from './../../theme/label';
import Input from './../../theme/input';
import Button from './../../theme/button';

const H2=styled.h2`
    text-align:center;`

    const P=styled.p`
    margin-left:25%;
    font-size:12px;   
    &:hover{
        text-decoration-color:gray;
        text-decoration:underline;
    }
    `

    const FormWrap=styled.div`
    margin-top:30px;
    margin-left:25%;
    `

function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

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
                <hr />
                <P onClick={props.registerForm}>Register</P>

            </Form>

    )
}

export default Login;
