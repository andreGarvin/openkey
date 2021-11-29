import { key } from '../actions';

// thunks
import { removeNotification, setErrorNotification } from './notification';
import { setFormError } from './form-error';

import * as navigate from './navigate';

import { invalidDataErrorCode } from './constant';

function toggleLoading() {
  return async function (dispatch) {
    dispatch({
      type: key.TOGGLE_LOADING,
    });
    return;
  };
}

export function createKey(url, expiration) {
  return async function (dispatch) {
    dispatch(toggleLoading());

    const response = await fetch('/api/key/create', {
      method: 'POST',
      body: JSON.stringify({ url, expiration }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const jsonErrorResponse = (await response.json()).error;

      if (jsonErrorResponse.code === invalidDataErrorCode) {
        dispatch(setFormError(jsonErrorResponse.errors));

        delete jsonErrorResponse.errors;
      }

      dispatch(setErrorNotification(jsonErrorResponse));
      dispatch(toggleLoading());
      return;
    }

    const newKey = (await response.json()).response;

    dispatch(navigate.setNavigation(`/view/${newKey.alias}`));
    dispatch(removeNotification());
    dispatch(toggleLoading());
  };
}

export function getKeyInfo(alias) {
  return async function (dispatch) {
    const response = await fetch(`/api/key/info/${alias}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const jsonErrorResponse = (await response.json()).error;

      dispatch(setErrorNotification(jsonErrorResponse));
      return;
    }

    const keyInfo = (await response.json()).response;

    dispatch({
      type: key.SET_KEY,
      payload: keyInfo,
    });
  };
}
