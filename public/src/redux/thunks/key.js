import { key } from '../actions';

// thunks
import { setFormError } from './form-error';
import { setError } from './error';

import * as navigate from './navigate';

const invalidDataErrorCode = 'INVALID_DATA_ERROR';

export function createKey(url, expiration) {
  return async function (dispatch) {
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

      dispatch(setError(jsonErrorResponse));
      return;
    }

    const newKey = (await response.json()).response;

    dispatch(navigate.setNavigation(`/view/${newKey.alias}`));
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

      dispatch(setError(jsonErrorResponse));
      return;
    }

    const keyInfo = (await response.json()).response;

    dispatch({
      type: key.SET_KEY,
      payload: keyInfo,
    });
  };
}
