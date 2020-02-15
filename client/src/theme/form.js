import styled from 'styled-components';

const Form = styled.form`
background:white;
color:black;
width:350px;
height:400px;
margin:0 auto;
border-radius:5%;
border:1px solid rgb(44, 8, 82); 
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


export default Form;
