import style from 'styled-components';
import React from 'react';

// redux
import { removeFormError } from '../redux/thunks/form-error';
import { sendFeedback } from '../redux/thunks/feedback';
import { connection as connect } from '../redux';

// components
import Modal, { Form, Footer, Header, FormSentence } from './Modal';
import FormError from './FormError';
import LinkStyle from './Link';
import Button from './Button';

const TextArea = style.textarea`
  width: 550px;
  height: 85px;
  resize: none;
  padding: 10px;
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid #c0bdbd;

  &:focus {
    border-color: #75b8ea;
    box-shadow: 0px 0px 4px -1px #75b8ea;
  }
`;

const Select = style.select`
  width: 100%;
  height: 33px;
  font-size: 14px;
  margin-bottom: 11px;
`;

const Feedback = ({ state, dispatch }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [label, setLabel] = React.useState('feedback');
  const [message, setMessage] = React.useState('');

  const { formError, notification } = state;

  React.useEffect(() => {
    if (notification.payload.type === 'success') {
      setShowModal(false);
      setIsLoading(false);
      setMessage('');
    } else {
      setIsLoading(false);
    }
  }, [notification.payload.type]);

  return (
    <React.Fragment>
      <LinkStyle onClick={() => setShowModal(true)}>feedback</LinkStyle>
      <Modal open={showModal} height="340px" onModalClose={setShowModal}>
        <Header className="header">
          <h3>send feedback</h3>
        </Header>
        <Form className="form">
          <FormSentence>send some feebdack about the application</FormSentence>
          <FormError fieldName="label" formErrors={formError.response}>
            <Select
              name="label"
              defaultValue="feedback"
              onChange={(e) => {
                setLabel(e.target.value);

                dispatch(removeFormError(e.target.name));
              }}
            >
              <option value="feedback">feedback</option>
              <option value="bug">bug</option>
              <option value="abuse">abuse</option>
            </Select>
          </FormError>

          <FormError fieldName="message" formErrors={formError.response}>
            <TextArea
              name="message"
              maxLength="280"
              placeholder="send some feedback"
              onChange={(e) => {
                setMessage(e.target.value);

                dispatch(removeFormError(e.target.name));
              }}
            />
          </FormError>
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
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true);
              dispatch(sendFeedback(message, label));
            }}
          >
            send
          </Button>
        </Footer>
      </Modal>
    </React.Fragment>
  );
};

export default connect(Feedback);
