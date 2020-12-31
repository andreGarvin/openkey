import style from 'styled-components';
import React from 'react';

// redux
// import { sendReport } from '../../redux/thunks/report';
import { connection as connect } from '../../redux';

// components
import Container from './style';
import Button from '../Button';

const ExtendedContainer = style(Container)`
  .main {
    flex: 1;
    padding: 20px;
  }
  
  .main h3 {
    margin: 0;
    font-size: 35px;
    margin-bottom: 0px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .main span {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    flex-direction: row;
  }
  
  .main span p, .main span a {
    margin-left: 8px;
    font-weight: lighter;
  }
  
  .main a, .footer p {
    color: #0cb8e2;
    font-size: 18px;
    cursor: pointer;
    letter-spacing: 1.2px;
    text-transform: lowercase;
    text-decoration: underline;

    &:hover {
      color: #0098be;
    }
  }

  .footer {
    flex: 0;
    display: flex;
    padding-right: 10px;
    padding-bottom: 2px;
    flex-direction: column;
  }

  .footer div {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    justify-content: center;
  }
  
  .footer div p:first-child {
    margin-right: 13px;
  }

  .footer a {
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-direction: column;
  }
  
  .footer a .button {
    width: 100%;
    font-size: 17px;
    text-transform: none;
  }
`;

const SecureText = style.p`
  color: ${(props) => (props.secure ? '#00d907' : '#f82c2c')};
`;

const NoRedirectText = style.p`
  color: #afafaf;
  font-style: italic;
`;

const card = ({ info }) => {
  if (!info) return null;

  const url = new URL(info.url.href);

  return (
    <ExtendedContainer className="card">
      <div className="main">
        <h3>{info.alias}</h3>
        <span>
          url:{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={url.protocol + url.hostname}
          >
            {url.hostname}
          </a>
        </span>
        <span>
          redirects:{' '}
          {info.url.redirects ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={info.url.redirects}
            >
              {info.url.redirects}
            </a>
          ) : (
            <NoRedirectText>none</NoRedirectText>
          )}
        </span>
        <span>
          secure:{' '}
          <SecureText secure={info.url.secure}>
            {info.url.secure ? 'secure' : 'not secure'}
          </SecureText>
        </span>
      </div>

      <div className="footer">
        <div>
          <p>share</p>
          <p>report</p>
        </div>
        <div>
          <a target="_blank" rel="noopener noreferrer" href={info.url.href}>
            <Button>open {url.host}</Button>
          </a>
        </div>
      </div>
    </ExtendedContainer>
  );
};

export default connect(card);
