import style from 'styled-components';
import React from 'react';

// components
import FeedBack from './Feedback';
import LinkStyle from './Link';

const FooterContainer = style.div`
  height: 30px;
  display: flex;
  padding-left: 7px;
  padding-right: 7px;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;

  a {
    margin-right: 13px;
  }
`;

export default () => {
  return (
    <FooterContainer className="footer">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/__andreGarvin__"
      >
        <LinkStyle>twitter</LinkStyle>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/andreGarvin/openkey"
      >
        <LinkStyle>gitHub</LinkStyle>
      </a>
      <FeedBack />
    </FooterContainer>
  );
};
