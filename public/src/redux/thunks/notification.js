import { notification } from '../actions';
import React from 'react';

export function setErrorNotification(error) {
  return async function (dispatch) {
    dispatch({
      type: notification.SET_NOTIFICATION,
      payload: {
        type: 'error',
        content: <p>{error.message}</p>,
      },
    });
    return;
  };
}

export function setNotification(payload) {
  return async function (dispatch) {
    dispatch({
      type: notification.SET_NOTIFICATION,
      payload,
    });
    return;
  };
}

export function removeNotification() {
  return async function (dispatch) {
    dispatch({
      type: notification.REMOVE_NOTIFICATION,
    });
    return;
  };
}
