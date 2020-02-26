import styled from 'styled-components';

const CommentContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 1rem;
  width: 100%;
  flex-basis: 100%;
`;

const CommentAvatar = styled.div`
  grid-area: 1/1/3/2;
  border-radius: 50%;
  width: 3.6rem;
  height: 3.6rem;
  align-self: flex-start;
  margin-right: 0.25rem;

  & > svg,
  img {
    height: 3.6rem;
    width: 3.6rem;
  }
`;

const CommentNameDateWrapper = styled.div`
  grid-area: 1/2/2/3;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const CommentName = styled.div`
  font-size: 1.6rem;
  margin-right: 0.5rem;
  font-weight: 600;
`;

const CommentTime = styled.div`
  font-size: 1.2rem;
`;

const CommentText = styled.div`
  grid-area: 2/2/3/4;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1c1d1c;
  margin-top: 0.5rem;
  
  & > span:first-child{
    padding-top: 1rem;
    padding-right: 1rem;
    display: inline-block;
  }

`;

const CommentEdited = styled.span`
display: ${props => (props.isEdited ? 'inline' : 'none') };
font-size: 1rem;`;


const Button = styled.button`
user-select: none;
outline: none;
cursor: pointer;
border: none;
border-radius: .4rem;
align-items: center;
position: relative;
display: inline-flex;
justify-content: center;
text-align: center;
white-space: nowrap;
-webkit-appearance: none;
-webkit-tap-highlight-color: transparent;
font-size: 1.5rem;
font-weight: 600;
height: 3.6rem;
min-width: 8rem;
padding: 0 1.2rem .1rem;
flex: 0 0 7.5%;`;

const DeleteButton = styled(Button)`
transition: all 80ms linear;
    background: #e01e5a;
    color: #fff;
    box-shadow: none;`;





const Styled = {CommentContainer, CommentAvatar, CommentNameDateWrapper, CommentName, CommentTime, CommentText, CommentEdited, Button, DeleteButton}

export default Styled

