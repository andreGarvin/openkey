import style from 'styled-components';
import React from 'react';

const LinkStyle = style.div`
  color: #0cb8e2;
  cursor: pointer;
  margin-top: 20px;
  letter-spacing: 1.2px;
  text-transform: capitalize;
  text-decoration: underline;

  &:hover {
    color: #0098be;
  }
`;

export default () => {
  return <LinkStyle>feedback</LinkStyle>;
};
