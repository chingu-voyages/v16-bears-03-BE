import React, { useState } from 'react';
import { Input } from '../../../../theme/theme';

function UserName(props) {
  const [name, setName] = useState(props.username);

  function changeUsername(e) {
    e.preventDefault();
    props.dispatch({ type: 'CHANGE_USERNAME', name });
    props.SetChangeUserName(false);
  }

  return (
    <form onSubmit={changeUsername}>
      <Input
        id="username"
        type="text"
        defaultValue={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => (e.keyCode === 13 ? changeUsername : null)}
        autoFocus
      />
    </form>
  );
}

export default UserName;
