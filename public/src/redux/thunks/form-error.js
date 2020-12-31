import { formError } from '../actions';

export function setFormError(errs) {
  return async function (dispatch) {
    dispatch({
      type: formError.SET_FORM_ERRORS,
      payload: errs,
    });
    return;
  };
}

export function removeFormError(field) {
  return async function (dispatch) {
    dispatch({
      type: formError.REMOVE_FORM_ERROR,
      payload: field,
    });
    return;
  };
}

export function removeFormErrors() {
  return async function (dispatch) {
    dispatch({
      type: formError.REMOVE_FORM_ERRORS,
    });
    return;
  };
}
