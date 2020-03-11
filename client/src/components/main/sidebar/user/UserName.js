import React, { useState } from 'react';
import { Input } from '../../../../theme/theme';
import axios from 'axios';

function UserName(props) {
  const [name, setName] = useState(props.username);

  function changeUsername(e) {
    e.preventDefault();

    axios
      .patch(
        `/api/users/${localStorage.userId}`,
        { name },
        {
          headers: { authorization: `bearer ${localStorage.authToken}` },
        },
      )
      .then(res => {
        props.dispatch({ type: 'CHANGE_USERNAME', name });
        props.SetChangeUserName(false);
        props.setLoggedinUser(name);
      })
      .catch(err => console.log(err.response.data));
  }

  return (
    <form onSubmit={changeUsername}>
      <Input
        id="userinput"
        type="text"
        value={name}
        pattern=".{6,15}"
        title="6 to 15 characters is required."
        onBlur={e => props.SetChangeUserName(false)}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => (e.keyCode === 13 ? changeUsername : null)}
        autoFocus
      />
    </form>
  );
}

export default UserName;
