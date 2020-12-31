import style from 'styled-components';
import React from 'react';

// components
import FeedBack from './Feedback';

const FooterContainer = style.div`
  height: 30px;
  display: flex;
  padding-left: 7px;
  padding-right: 7px;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;

  a {
    color: #0cb8e2;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 13px;
    letter-spacing: 1.2px;
    text-transform: capitalize;

    &:hover {
      color: #0098be;
    }
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
        twitter
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/andreGarvin/openkey"
      >
        gitHub
      </a>
      <FeedBack />
    </FooterContainer>
  );
};
