import style from 'styled-components';
import React from 'react';

const FormFieldError = style.div`
  display: flex;
  flex-direction: column;

  input, textarea {
    border: 1px solid ${(props) => (props.error ? '#f82c2c' : '#c0bdbd')};
    box-shadow: ${(props) =>
      props.error ? '0px 0px 3px 0px #f82c2c' : 'unset'};
  }

  select {
    box-shadow: ${(props) =>
      props.error ? '0px 0px 3px 3px #f82c2c' : 'unset'};
  }

  p {
    width: 500px;
    height: 19px;
    color: #f82c2c;
    text-transform: lowercase;
    visibility: ${(props) => (props.error ? 'inherit' : 'hidden')};
  }
`;

const getFieldError = (field, errors = []) => {
  const [error] = errors.filter((error) => error.field === field);

  return error ? error.message : '';
};

export default ({ children, fieldName, formErrors = [] }) => {
  const fieldError = getFieldError(fieldName, formErrors);

  return (
    <FormFieldError error={fieldError}>
      <p>{fieldError}</p>
      {children}
    </FormFieldError>
  );
};
