import { navigate } from '../actions';

export function setNavigation(path) {
  return async function (dispatch) {
    dispatch({
      type: navigate.SET_NAVIGATION,
      payload: path,
    });
    return;
  };
}

export function removeNavigation() {
  return async function (dispatch) {
    dispatch({
      type: navigate.REMOVE_NAVIGATION,
    });
    return;
  };
}
