import style from 'styled-components';
import React from 'react';

const Button = style.button`
  color: #fff;
  border: none;
  padding: 10px;
  display: flex;
  cursor: pointer;
  font-size: 15px;
  width: max-content;
  border-radius: 4px;
  height: max-content;
  align-items: center;
  min-width: max-content;
  justify-content: center;
  background-color: #45c0de;
  text-transform: capitalize;

  .loader {
    width: 15px;
    height: 15px;
    margin-right: 20px;
    border-radius: 50%;
    border-top: 3px solid #f3f3f3;
    animation: spin 1s linear infinite;
    display: ${(props) => (props.isLoading ? 'unset' : 'none')};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default (props) => {
  return (
    <Button
      className="button"
      onClick={props.onClick}
      isLoading={props.isLoading}
    >
      <div className="loader"></div>
      <p>{props.children}</p>
    </Button>
  );
};
