import React, { useState } from 'react';
import { Input } from '../../../../theme/theme';

function UserName(props) {
  const [name, setName] = useState(props.username);

  function changeUsername(e) {
    e.preventDefault();
    {
      /*Todo: axios to update the username*/
    }
    props.dispatch({ type: 'CHANGE_USERNAME', name });
    props.SetChangeUserName(false);
  }

  return (
    <form onSubmit={changeUsername}>
      <Input
        id="userinput"
        type="text"
        defaultValue={name}
        pattern=".{6,15}"
        title="6 to 15 characters is required."
        onChange={e => setName(e.target.value)}
        onKeyDown={e => (e.keyCode === 13 ? changeUsername : null)}
        autoFocus
      />
    </form>
  );
}

export default UserName;
