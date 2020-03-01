import React, { useEffect, useState } from 'react';
import createJdention from './createJdenticon';
import { Div, Input, Label, SmallButton, CloseButton } from '../../../../theme/theme';
import styled from 'styled-components';
import axios from 'axios';

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

  function resetImage() {
    createJdention(props.image, props.id, 'bigimage');
    setUrl('');
  }

  function updateImage(e) {
    e.preventDefault();
    axios
      .patch(
        `/api/users/${props.id}`,
        { userImage: url },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      )
      .then(res => {
        props.setImageUrl(url);
        props.dispatch({ type: 'CHANGE_IMAGEURL', imageurl: url });
      })
      .catch(err => console.log(err.response.data));
    setUrl('');
  }

  function deleteImage() {
    axios
      .patch(
        `/api/users/${props.id}`,
        { userImage: 'null' },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      )
      .then(res => {
        props.setImageUrl(null);
        props.dispatch({ type: 'CHANGE_IMAGEURL', imageurl: null });
      })
      .catch(err => console.log(err.response.data));
  }

  return (
    <Div type="image">
      <CloseButton onClick={() => props.SetOpenImageWindow(false)}>X</CloseButton>

      <BigProfileImage id="bigimage"></BigProfileImage>

      <form onSubmit={updateImage}>
        <Label htmlFor="urlinput">
          Image URL:
          <br />
          <Input
            type="url"
            id="urlinput"
            value={url}
            title="Please enter a valid image URL."
            onChange={e => {
              e.preventDefault();
              setUrl(e.target.value);
            }}
            autoFocus
            required
          />
        </Label>

        <ButtonDiv>
          <SmallButton
            type="button"
            onClick={previewImage}
            disabled={url.length > 11 ? false : true}
          >
            Preview
          </SmallButton>

          <SmallButton type="button" onClick={resetImage} disabled={url.length >= 1 ? false : true}>
            Reset
          </SmallButton>

          <SmallButton type="submit" background="white">
            Update
          </SmallButton>

          <SmallButton
            type="button"
            background="white"
            onClick={deleteImage}
            disabled={props.imageurl === null ? true : false}
          >
            Delete
          </SmallButton>
        </ButtonDiv>
      </form>
    </Div>
  );
}

export default Image;
