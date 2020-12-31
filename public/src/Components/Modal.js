import style from 'styled-components';
import React from 'react';

const Modal = style.div`
  .mask {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    cursor: auto;
    z-index: 1051;
    position: fixed;
    filter: alpha(opacity=50);
    background: rgba(0, 0, 0, 0.6);
  }

  .modal {
    z-index: 1052;
    position: fixed;
  }

  .modal .mini-select > div {
    border: 0;
    width: 55px;
    border-radius: 0;
    border-bottom: 1px solid #ddd;
  }

  .modal .main {
    // width: 520px;
    top: 50%;
    left: 50%;
    width: 600px;
    display: flex;
    height: 320px;
    position: fixed;
    border-radius: 4px;
    flex-direction: column;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2);
  }

  // .modal > .main .header {
  //   display: flex;
  //   flex-direction: row;
  //   padding: 20px 20px 5px 20px;
  //   justify-content: space-between;
  //   border-bottom: 2px solid #f1f1f1;
  // }

  // .modal > .main .header h2 {
  //   margin: 0;
  //   font-size: 22px;
  //   font-weight: 700;
  //   text-transform: capitalize;
  //   color: rgba(24, 24, 24, 0.68);
  // }

  // .modal > .main .header .icon {
  //   width: 14px;
  //   height: 14px;
  // }

  // .modal > .main .header .icon g g path {
  //   opacity: 0.54;
  //   color: #181818;
  //   fill: currentColor;
  // }

  // .modal > .main .forum {
  //   height: 82%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-evenly;
  // }

  // .modal > .main .forum input {
  //   border: 0;
  //   width: 60%;
  //   width: 60%;
  //   font-size: 16px;
  //   font-weight: 400;
  //   color: #181818;
  //   padding-bottom: 5px;
  //   text-transform: capitalize;
  //   border-bottom: 1px solid #ddd;
  // }

  // .modal > .main .forum .button {
  //   background-color: $yellow;
  // }

  // .modal-select {
  //   z-index: 1057;
  // }

  // .modal > .main .forum .ant-select-selection__rendered {
  //   display: flex;
  //   align-items: center;
  // }
`;

export default () => {
  return <Modal className="modal"></Modal>;
};
