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
  height: calc(100vh - 4rem);
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  top: 4rem;
  right: 0px;
  background: white;
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 480px) and (max-width: 900px) {
    width: 70%;
  }
`;

const Title = styled.div`
  padding: 1.5rem;
  display: flex;
  border-bottom: 1px solid lightgray;
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
  }
`;

const ThreadsContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
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
  margin: 1rem auto;
  font-size: 1.5rem;
  position: relative;
  resize: none;
`;

export { ThreadInfo, ThreadContainer, ThreadsContainer, Textarea, Title, ThreadAvatar, Header };
