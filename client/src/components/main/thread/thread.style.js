import styled from 'styled-components';

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
`;

const Header = styled.div`
  text-align: left;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
`;

export { ThreadContainer, Header };
