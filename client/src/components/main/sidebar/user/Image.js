import React, { useEffect, useState } from 'react';
import createJdention from './createJdenticon';
import { Div, Input, SmallButton, CloseButton } from '../../../../theme/theme';
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
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Image(props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    createJdention(props.image, props.id, 'bigimage');
  }, [props.image, props.id]);

  function previewImage() {
    createJdention(url, props.id, 'bigimage');
  }

  return (
    <Div type="image">
      <CloseButton onClick={() => props.SetOpenImageWindow(false)}>X</CloseButton>
      <BigProfileImage id="bigimage"></BigProfileImage>

      <form>
        <Input
          defaultValue="Please input image url"
          id="urlinput"
          onChange={e => setUrl(e.target.value)}
          autoFocus
        />

        <ButtonDiv>
          <SmallButton type="button" onClick={previewImage}>
            Preview
          </SmallButton>

          <SmallButton type="button">Cancel</SmallButton>

          <SmallButton type="submit" background="white">
            Update
          </SmallButton>

          <SmallButton type="button" background="white">
            Delete
          </SmallButton>
        </ButtonDiv>
      </form>
    </Div>
  );
}

export default Image;
