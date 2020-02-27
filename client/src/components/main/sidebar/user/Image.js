import React, { useEffect } from 'react';
import createJdention from './createJdenticon';
import { Div, Input, SmallButton } from '../../../../theme/theme';
import styled from 'styled-components';

const BigProfileImage = styled.div`
  margin: 1rem auto;
  & > svg,
  img {
    width: 210px;
    height: 210px;
    border: 5px solid lightgray;
  }
`;

const ButtonDiv = styled.div`
  width: 210px;
  display: flex;
  justify-content: space-between;
`;

function Image(props) {
  useEffect(() => {
    createJdention(props.image, props.id, 'bigimage');
  }, [props.image, props.id]);

  return (
    <Div type="image">
      <BigProfileImage id="bigimage"></BigProfileImage>

      <form>
        <Input defaultValue="Please input image url" id="urlinput" autoFocus />

        <ButtonDiv>
          <SmallButton type="button">Preview</SmallButton>
          <SmallButton type="submit" background="white">
            Update
          </SmallButton>
        </ButtonDiv>
      </form>
    </Div>
  );
}

export default Image;
