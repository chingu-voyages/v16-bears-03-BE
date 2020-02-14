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


export default Button;