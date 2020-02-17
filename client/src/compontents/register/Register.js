import React, { useState } from 'react';
import styled from 'styled-components';
import {Form,Label,Input,Button} from './../../theme/theme.js';


const P = styled.p`
        margin-left:25%;
        font-size:12px;   
        &:hover{
        text-decoration-color:gray;
        text-decoration:underline;
        cursor:pointer;
}
`

const H2 = styled.h2`
    text-align:center;`

const FormWrap = styled.div`
     margin-top:30px;
    margin-left:25%;
    `

function Register(props) {

    return (

        <Form form="register">
            <H2>Create an Account </H2>
            <FormWrap >
                <Label htmlFor="name" >Username:<br />
                <Input type="text" name="name" id="name" required /><br />
                </Label>
                <Label htmlFor="password">Password:<br />
                <Input type="text" name="password" id="password" required /><br />
                </Label>
                <Label htmlFor="email">Email:</Label><br />
                <Input type="text" name="email" id="email" required /><br />
                <Button type="Register">Sign Up</Button>
            </FormWrap>
            <hr />
            <P onClick={()=>props.set_new_user(false)}>Sign in</P>
        </Form>

    )
}

export default Register;


