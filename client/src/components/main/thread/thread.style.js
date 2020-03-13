import styled from 'styled-components';

const ThreadInfo = styled.div`
  display: grid;
  grid-template-rows: 2rem auto;
  width: 100%;
`;

const ThreadContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: 40%;
  height: calc(100vh - 7.2rem);
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  top: 7.2rem;
  right: 0px;
  background: white;
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 480px) and (max-width: 900px) {
    width: 80%;
  }
`;

const Title = styled.div`
  padding: 1.5rem;
  display: flex;
  border-bottom: 1px solid lightgray;
  position: relative;
  ${props => {
    if (props.id === 'notatitle') {
      return `border-bottom: none;
      &:hover{
       background:rgb(224,224,224);
    }
  }  
 `;
    }
  }}
`;

const ThreadAvatar = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  margin-right: 0.25rem;
  & > svg,
  img {
    height: 3.6rem;
    width: 3.6rem;
    border-radius: 10%;
    ${props => {
      if (props.type === 'small') {
        return `height:2.5rem;
                width:2.5rem;
                border:0.5px solid lightgray;`;
      }
    }};
  }
`;

const AllThreads = styled.section`
  overflow-y: auto;
  height: 58vh;
  scrollbar-color: #919191;
  scrollbar-width: thin;
  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    border: 0.01rem solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.7rem;
    height: 0;
  }
  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: 0.1rem solid #919191;
    background: #919191;
  }
`;

const Header = styled.div`
  text-align: left;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
`;

const Textarea = styled.textarea`
  padding: 1rem 1rem 2rem 1rem;
  color: #555;
  border-radius: 5px;
  width: 100%;
  margin: auto;
  font-size: 1.5rem;
  position: relative;
  resize: none;
`;

const Menu = styled.div`
  border: 1px solid #555;
  background: white;
  height: 4rem;
  width: 8rem;
  position: absolute;
  right: 3rem;
  top: 1rem;
  font-size: 1.2rem;
  & > div {
    text-align: center;
    list-style-type: none;
    height: 2rem;
    padding-top: 0.3rem;
    &:hover {
      background: gray;
      color: white;
    }
  }
`;
export { ThreadInfo, ThreadContainer, AllThreads, Textarea, Title, ThreadAvatar, Header, Menu };
