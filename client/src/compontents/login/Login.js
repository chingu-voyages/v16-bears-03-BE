import React, { useState } from 'react';
import styled from 'styled-components';
import {Form,Label,Input,Button} from './../../theme/theme.js';


const H2=styled.h2`
    text-align:center;`

    const P=styled.p`
    margin-left:25%;
    font-size:12px;   
    &:hover{
        text-decoration-color:gray;
        text-decoration:underline;
        cursor:pointer;
    }
    `

    const FormWrap=styled.div`
    margin-top:30px;
    margin-left:25%;
    `

function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail]=useState('');

    return (

            <Form background="white" >
                <H2 >Login </H2>
                <FormWrap>
                <Label htmlFor="email">Email:<br />
                <Input type="text" name="email" id="email" required /><br />
                </Label>
                <Label htmlFor="password">Password:<br />
                <Input type="text" name="password" id="password" required /><br />
                </Label>
                <Button background="purple" type="submit">Sign In</Button>
                </FormWrap>
                <hr />
                <P onClick={()=>props.set_new_user(true)}>Register</P>
            </Form>

    )
}

export default Login;

