import style from 'styled-components';
import React from 'react';

// components
import Button from './Button';

const Header = style.div`
  height: 75px;
  display: flex;
  padding: 15px;
  padding-top: 0;
  padding-bottom: 0;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.16);

  a {
    color: black;
    font-size: 50px;
    text-decoration: none;
    font-family: 'Ubuntu', sans-serif;
  }
`;

export default () => {
  return (
    <Header className="header">
      <a href="/">openkey</a>

      <Button>enter key alias</Button>
    </Header>
  );
};
