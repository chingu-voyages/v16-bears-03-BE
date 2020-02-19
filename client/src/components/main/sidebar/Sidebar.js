import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Aside = styled.aside`
  width: 22rem;
  height: 100vh;
  background: rgb(44, 8, 82);
  color: white;
  font-size: 2rem;
  li {
    text-decoration: none;
  }
`;

function Sidebar() {
  return (
    <Aside>
      <ul>
        <li>All Users</li>
      </ul>
    </Aside>
  );
}

export default Sidebar;
