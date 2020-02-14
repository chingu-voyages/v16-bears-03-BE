import styled from 'styled-components';

const Form = styled.form`
background:rgb(44, 8, 82);
color:white;
width:35%;
height:400px;
margin:0 auto;
border-radius:5%;
border:1px solid white;
${props => {
        if (props.background === "white") {
            return `background:white;
                color:black;
                border:1px solid rgb(44, 8, 82)`
        }
    }}
`
export default Form;
