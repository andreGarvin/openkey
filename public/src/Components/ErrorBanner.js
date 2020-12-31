import style from 'styled-components';
import React from 'react';

// redux
import { removeError } from '../redux/thunks/error';
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
    display: flex;
    padding: 20px;
    max-width: 100%;
    font-size: 18px;
    flex-direction: row;
    background-color: #f82c2c;
    justify-content: space-between;
    transition: max-height 0.3s ease-out;
    max-height: ${(props) => (props.show ? '45px' : '0')};
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    
  }
`;

export default connect(({ state, dispatch }) => {
  const { response } = state.error;

  return (
    <Banner className="error-banner" show={response}>
      <div className="content">
        <p>{response ? response.message : ''}</p>
        <p className="close" onClick={() => dispatch(removeError())}>
          x
        </p>
      </div>
    </Banner>
  );
});
