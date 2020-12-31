import style from 'styled-components';
import React from 'react';

const Button = style.button`
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
  width: max-content;
  border-radius: 4px;
  height: max-content;
  min-width: max-content;
  background-color: #45c0de;
  text-transform: capitalize;
`;

export default (props) => {
  return (
    <Button className="button" onClick={props.onClick}>
      {props.children}
    </Button>
  );
};
