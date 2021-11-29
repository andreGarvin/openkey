import style from 'styled-components';
import React from 'react';

const Modal = style.div`
  position: absolute;
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};

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

  .modal .main {
    top: 45%;
    left: 50%;
    width: 575px;
    display: flex;
    padding: 20px;
    display: flex;
    position: fixed;
    border-radius: 4px;
    flex-direction: column;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2);
    height: ${(props) => props.height || '320px'};
  }
`;

export const Header = style.div`
  font-size: 26px;
  margin-bottom: 20px;
  text-transform: capitalize;

  h3 {
    margin: 0;
  }
`;

export const Form = style.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

export const Footer = style.div`
  flex: 1;
  display: flex;
  align-items: end;
  flex-direction: row;
  justify-content: flex-end;
  
  .cancel {
    margin-top: 0;
    font-size: 18px;
    margin-right: 15px;
  }
`;

export const FormSentence = style.div`
  opacity: 0.8;
  font-size: 18px;
  margin-bottom: 10px;
`;

export default (props) => {
  return (
    <Modal open={props.open} height={props.height} className="modal">
      <div className="mask" onClick={() => props.onModalClose(false)}></div>
      <div className="modal">
        <div className="main">{props.children}</div>
      </div>
    </Modal>
  );
};
