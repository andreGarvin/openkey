import style from 'styled-components';
import React from 'react';

// components
import Modal, { Form, Footer, Header as ModalHeader } from './Modal';
import LinkStyle from './Link';
import Button from './Button';

const Header = style.div`
  height: 75px;
  display: flex;
  padding: 15px;
  padding-top: 0;
  padding-bottom: 0;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.16);

  a {
    color: black;
    font-size: 50px;
    text-decoration: none;
    font-family: 'Ubuntu', sans-serif;
  }
`;

const Input = style.input`
  height: 30px;
  text-indent: 10px;
  border-radius: 4px;
  font-size: initial;
  border: 1px solid #ddd;
`;

export default () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Header className="header">
      <a href="/">openkey</a>

      <Button onClick={() => setShowModal(true)}>enter key alias</Button>
      <Modal open={showModal} height="160px" onModalClose={setShowModal}>
        <ModalHeader className="header">
          <h3>enter the key alias</h3>
        </ModalHeader>
        <Form className="form">
          <Input placeholder="enter alias" />
        </Form>
        <Footer className="footer">
          <LinkStyle
            noCapitalization
            className="cancel"
            onClick={() => setShowModal(false)}
          >
            cancel
          </LinkStyle>
          <Button>enter</Button>
        </Footer>
      </Modal>
    </Header>
  );
};
