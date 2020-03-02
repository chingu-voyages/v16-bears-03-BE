import styled from 'styled-components';

/*styles for comment component*/

const CommentContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 1rem;
  width: 100%;
  flex-basis: 100%;
  margin-bottom: 1rem;

  &:hover {
    & > div:nth-child(4) {
      visibility: visible;
    }
  }
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

const CommentTextWrapper = styled.div`
  grid-area: 2/2/3/4;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1c1d1c;
  margin-top: 0.5rem;
`;

const CommentText = styled.span`
  padding-top: 1rem;
  padding-right: 1rem;
  display: inline-block;
`;

const CommentEdited = styled.span`
  display: ${props => (props.isEdited ? 'inline' : 'none')};
  font-size: 1rem;
`;

const CommentMenu = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
  visibility: hidden;
  flex-direction: column;
  width: 3rem;
  transition: all 80ms linear;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const CommentKebab = styled.figure`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.2rem 0;
  background-color: #181818;
`;

const CommentDropdown = styled.div`
  display: flex;
  flex-flow: column wrap;
  border: 0.1rem solid #181818;
  grid-area: 2/3/2/4;
  height: 6.5rem;
  width: 12rem;
  background-color: #f1f1f1;
  box-shadow: 0px 0.1rem 1.2rem 0px rgba(0, 0, 0, 0.2);
  justify-content: space-around;
  border-radius: 0.4rem;
  position: absolute;
  top: ${props => props.pos}px;
  right: 3.5rem;
`;

const Button = styled.button`
  user-select: none;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 0.4rem;
  position: relative;
  align-items: center;
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
  padding: 0 1.2rem 0.1rem;
  flex: 0 0 7.5%;
  transition: all 80ms linear;

  &:hover {
    transform: translateY(0.1rem);
    font-size: 1.75rem;
  }
`;

const SaveButton = styled(Button)`
  background-color: #007a5a;
  color: #fff;
  box-shadow: none;
`;

const DeleteButton = styled(Button)`
  background: #e01e5a;
  color: #fff;
  box-shadow: none;
`;

const MenuButton = styled(Button)`
  font-weight: 500;
  font-size: 1.4rem;
  background: none;
  border-radius: 0;
  padding-left: 0.5rem;
  justify-content: flex-start;
  width: 100%;

  &:hover {
    transform: translateY(0.1rem);
    font-size: 1.45rem;
    background-color: #7a7efa;
  }
`;

const MenuDeleteButton = styled(MenuButton)`
  color: #e01e5a;

  &:hover {
    background-color: #e01e5a;
    color: #fff;
  }
`;

/*styles for components that create or edit comments*/

const CommentFormWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CommentForm = styled.form`
  width: 100%;
`;

const CommentTextArea = styled.textarea`
  padding: 0.25rem;
  border: 0.1rem solid #241722;
  resize: none;
  outline: none;
  scrollbar-color: #919191;
  scrollbar-width: thin;
  border-radius: 0.15rem;
  font-size: 1.6rem;
  height: 6rem;
  width: 98%;
  border-radius: 0.5rem;
  margin-left: 0.5rem;

  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    border: 0.01rem solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.4rem;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: 0.1rem solid #919191;
    background: #919191;
  }
`;

const Styled = {
  CommentContainer,
  CommentAvatar,
  CommentNameDateWrapper,
  CommentName,
  CommentTime,
  CommentTextWrapper,
  CommentText,
  CommentMenu,
  CommentKebab,
  CommentDropdown,
  CommentEdited,
  Button,
  SaveButton,
  DeleteButton,
  MenuButton,
  MenuDeleteButton,
  CommentFormWrapper,
  CommentForm,
  CommentTextArea,
};

export default Styled;
