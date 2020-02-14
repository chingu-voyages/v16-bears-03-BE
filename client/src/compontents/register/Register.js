import React,{useState} from 'react';
import styled from 'styled-components';
import Form from './../../theme/form';
import Label from './../../theme/label';
import Input from './../../theme/input';
import Button from './../../theme/button';

function Register() {
    const H2=styled.h2`
    text-align:center;`

    const FormWrap=styled.div`
     margin-top:30px;
    margin-left:25%;
    `
    
    return (

        <Form>
            <H2>Create an Account </H2>
            <FormWrap>
           <Label htmlFor="name" >Username:</Label><br/>
           <Input type="text" name="name" id="name" required></Input><br/>
           <Label htmlFor="password">Password:</Label><br/>
           <Input type="text" name="password" id="password" required></Input><br/>
           <Label htmlFor="email">Email:</Label><br/>
           <Input type="text" name="email" id="email" required></Input><br/>
           <Button type="Register">Sign Up</Button>
           </FormWrap>
        </Form>

    )
}

export default Register;
