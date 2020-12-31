import { error } from '../actions';

export function setError(e) {
  return async function (dispatch) {
    dispatch({
      type: error.SET_ERROR,
      payload: e,
    });
    return;
  };
}

export function removeError() {
  return async function (dispatch) {
    dispatch({
      type: error.REMOVE_ERROR,
    });
    return;
  };
}
