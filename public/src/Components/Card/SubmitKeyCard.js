import style from 'styled-components';
import React from 'react';

// redux
import { connection as connect } from '../../redux';
import { createKey } from '../../redux/thunks/key';

// components
import Container from './style';
import Button from '../Button';
import { formError } from '../../redux/actions';
import { removeFormError } from '../../redux/thunks/form-error';

const CardFormContainer = style.div`
  flex: 10;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  label {
    width: 500px;
    margin-bottom: 5px;
    text-transform: capitalize;
  }
  
  label::after {
    content: ':';
  }
`;

const CardFormInput = style.input`
  width: 500px;
  height: 30px;
  font-size: 15px;
  text-indent: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => (props.error ? '#f82c2c' : '#c0bdbd')};
  box-shadow: ${(props) => (props.error ? '0px 0px 3px 0px #f82c2c' : 'unset')};

  ::placeholder {
    text-transform: capitalize;
  }

`;

const CardFormSelect = style.select`
  width: 509px;
  height: 30px;

  box-shadow: ${(props) => (props.error ? '0px 0px 3px 3px #f82c2c' : 'unset')};
`;

const FormError = style.p`
  width: 500px;
  height: 24px;
  color: #f82c2c;
  text-transform: lowercase;
  visibility: ${(props) => (props.error ? 'visible' : 'hidden')};
`;

const getFieldError = (field, errors = []) => {
  const [error] = errors.filter((error) => error.field === field);

  return error ? error.message : '';
};

const card = (props) => {
  const [expiration, setExpiration] = React.useState(5);
  const [url, setURL] = React.useState('');

  const { formError } = props.state;

  const selectOptions = () => {
    return [5, 10, 20, 30, 60].map((expiration) => {
      return (
        <option key={expiration} value={expiration}>
          {expiration} mins
        </option>
      );
    });
  };

  const urlFieldError = getFieldError('url', formError.response);
  const expirationFieldError = getFieldError('expiration', formError.response);

  return (
    <Container className="card">
      <CardFormContainer className="form">
        <FormError error={urlFieldError}>{urlFieldError}</FormError>
        <CardFormInput
          name="url"
          className="input"
          error={urlFieldError}
          placeholder="enter URL"
          onChange={(e) => {
            if (urlFieldError) {
              props.dispatch(removeFormError(e.target.name));
            }

            setURL(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              props.dispatch(createKey(url, expiration));
            }
          }}
        />
        <FormError error={expirationFieldError}>
          {expirationFieldError}
        </FormError>
        <label>expiration</label>
        <CardFormSelect
          name="expiration"
          defaultValue="5"
          className="select"
          error={expirationFieldError}
          onChange={(e) => {
            if (urlFieldError) {
              props.dispatch(removeFormError(e.target.name));
            }

            setExpiration(parseInt(e.target.value, 10));
          }}
        >
          {selectOptions()}
        </CardFormSelect>
      </CardFormContainer>
      <div className="footer">
        <Button onClick={() => props.dispatch(createKey(url, expiration))}>
          create key
        </Button>
      </div>
    </Container>
  );
};

export default connect(card);
