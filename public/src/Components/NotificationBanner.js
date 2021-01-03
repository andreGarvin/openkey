import style from 'styled-components';
import React from 'react';

// redux
import { removeNotification } from '../redux/thunks/notification';
import { connection as connect } from '../redux';

const Banner = style.div`
  height: 45px;

  .close {
    cursor: pointer;
    height: max-content;
  }

  p::first-letter {
    text-transform: capitalize;
  }

  p:first-child::after {
    content: '.';
  }

  .content {
    color: #fff;
    height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    transition: max-height 0.3s ease-out;
    max-height: ${(props) => (props.show ? '45px' : '0')};
    background-color: ${(props) =>
      props.type ? (props.type === 'error' ? '#f82c2c' : '#00af06') : ''}; 
  }

  .content .wrapper {
    padding: 20px;
    display: flex;
    padding-top: 0;
    max-width: 100%;
    font-size: 14px;
    padding-bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  }
`;

export default connect(({ state, dispatch }) => {
  const { payload } = state.notification;

  const { type = '', content = null } = payload;

  // setTimeout(() => {
  //   dispatch(removeNotification());
  // }, 9000);

  return (
    <Banner className="notification-banner" show={content} type={type}>
      <div className="content">
        <div className="wrapper">
          {content}
          <p className="close" onClick={() => dispatch(removeNotification())}>
            x
          </p>
        </div>
      </div>
    </Banner>
  );
});
