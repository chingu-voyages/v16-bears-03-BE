const createJdention = (image, id) => {
  const script = document.createElement('script');
  const defaultUserImg = `jdenticon.toSvg('${id}',200)`;
  const userSetImage = `"<img alt='Profile_image' src='${image}' />"`;
  script.innerHTML = `document.getElementById('${id}').innerHTML=${
    image === null ? defaultUserImg : userSetImage
  }`;
  document.body.appendChild(script);
};

export default createJdention;
