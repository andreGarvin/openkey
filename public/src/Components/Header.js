import style from 'styled-components';
import React from 'react';

// redux
import { getKeyInfo, getKeyInfoAndNaviagte } from '../redux/thunks/key';
import { connection as connect } from '../redux';

// components
import Modal, { Form, Footer, Header as ModalHeader } from './Modal';
import LinkStyle from './Link';
import Button from './Button';
import { removeNavigation, setNavigation } from '../redux/thunks/navigate';

const HeaderContainer = style.div`
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

const Header = ({ state, dispatch }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [alias, setAlias] = React.useState('');

  React.useEffect(() => {
    const key = state.key.response;
    if (key) {
      dispatch(setNavigation(`/view/${key.alias}`));
      setShowModal(false);
    }
  }, [state.key.response]);

  return (
    <HeaderContainer className="header">
      <a href="/">openkey</a>

      <Button onClick={() => setShowModal(true)}>enter key alias</Button>

      <Modal open={showModal} height="160px" onModalClose={setShowModal}>
        <ModalHeader className="header">
          <h3>enter the key alias</h3>
        </ModalHeader>
        <Form className="form">
          <Input
            placeholder="enter alias"
            onChange={(e) => setAlias(e.target.value)}
          />
        </Form>
        <Footer className="footer">
          <LinkStyle
            noCapitalization
            className="cancel"
            onClick={() => setShowModal(false)}
          >
            cancel
          </LinkStyle>
          <Button
            onClick={() => {
              dispatch(getKeyInfo(alias));
              setAlias('');
            }}
          >
            enter
          </Button>
        </Footer>
      </Modal>
    </HeaderContainer>
  );
};

export default connect(Header);
