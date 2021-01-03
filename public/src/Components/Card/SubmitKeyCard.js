import style from 'styled-components';
import React from 'react';

// redux
import { removeFormError } from '../../redux/thunks/form-error';
import { connection as connect } from '../../redux';
import { createKey } from '../../redux/thunks/key';

// components
import FormError from '../FormError';
import Container from './style';
import Button from '../Button';

const CardFormContainer = style.div`
  flex: 10;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  label {
    width: 500px;
    margin-top: 5px;
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

  ::placeholder {
    text-transform: capitalize;
  }

`;

const CardFormSelect = style.select`
  width: 509px;
  height: 30px;
`;

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

  return (
    <Container className="card">
      <CardFormContainer className="form">
        <FormError fieldName="url" formErrors={formError.response}>
          <CardFormInput
            name="url"
            className="input"
            placeholder="enter URL"
            onChange={(e) => {
              props.dispatch(removeFormError(e.target.name));

              setURL(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                props.dispatch(createKey(url, expiration));
              }
            }}
          />
        </FormError>

        <label>expiration</label>
        <FormError fieldName="expiration" formErrors={formError.response}>
          <CardFormSelect
            name="expiration"
            defaultValue="5"
            className="select"
            onChange={(e) => {
              props.dispatch(removeFormError(e.target.name));

              setExpiration(parseInt(e.target.value, 10));
            }}
          >
            {selectOptions()}
          </CardFormSelect>
        </FormError>
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
