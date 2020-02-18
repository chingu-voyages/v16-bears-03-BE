import styled from 'styled-components';

const Button=styled.button`
width:68%;
height:35px;
margin:20px auto;
border:none;
border-radius:5px;
cursor:pointer;
font-size:18px;
&:hover {
    color:${props=>props.background==="purple"?"black":"white"};
    background:rgb(191,187,191);
}
${props=>{
    if(props.background==="purple"){
        return `background:rgb(44, 8, 82);
                color:white`
    }
}
};
`

const Form = styled.form`
background:white;
color:black;
width:350px;
height:400px;
margin:0 auto;
border-radius:5%;
border:1px solid rgb(44, 8, 82); 
@media (max-width:480px){
  width:300px;
};
${(props) => {
        if (props.form === "register") {
            return `background:rgb(44, 8, 82);
                color:white;
                border:1px solid white;
                height:450px;
        `
        }
    }
    } 
    
`
const Input=styled.input`
width:65%;
height:25px;
margin:3px auto 12px auto;
`

const Label=styled.label`
font-size:15px;
`

export  {Button,Form,Input,Label};