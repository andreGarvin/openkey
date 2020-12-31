import style from 'styled-components';
import React from 'react';

// components
import Modal, { Form, Footer, Header, FormSentence } from './Modal';
import LinkStyle from './Link';
import Button from './Button';

const TextArea = style.textarea`
  height: 100%;
  resize: none;
  padding: 10px;
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid #c0bdbd;

  &:focus {
    border-color: #75b8ea;
    box-shadow: 1px 1px 2px -1px #75b8ea;
  }
`;

const Select = style.select`
  height: 33px;
  font-size: 14px;
  margin-bottom: 11px;
`;

export default () => {
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [label, setLabel] = React.useState('');

  return (
    <React.Fragment>
      <LinkStyle onClick={() => setShowModal(true)}>feedback</LinkStyle>
      <Modal open={showModal} onModalClose={setShowModal}>
        <Header className="header">
          <h3>send feedback</h3>
        </Header>
        <Form className="form">
          <FormSentence>send some feebdack about the application</FormSentence>
          <Select
            defaultValue="feedback"
            onChange={(e) => setLabel(e.target.value)}
          >
            <option value="feedback">feedback</option>
            <option value="bug">bug</option>
            <option value="abuse">abuse</option>
          </Select>
          <TextArea maxLength="280" placeholder="send some feedback" />
        </Form>
        <Footer className="footer">
          <LinkStyle
            noCapitalization
            className="cancel"
            onClick={() => setShowModal(false)}
          >
            cancel
          </LinkStyle>
          <Button>send</Button>
        </Footer>
      </Modal>
    </React.Fragment>
  );
};
