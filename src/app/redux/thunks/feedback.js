import React from 'react';

// thunks
import { setNotification, setErrorNotification } from './notification';
import { setFormError } from './form-error';

import { invalidDataErrorCode } from './constant';

export function sendFeedback(message, label) {
  return async function (dispatch) {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ message, label }),
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
      return;
    }

    const feedbackResponse = (await response.json()).response;

    dispatch(
      setNotification({
        type: 'success',
        content: (
          <p>
            feedback has been sent! you can view the feedback thread{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={feedbackResponse.url}
              style={{ color: '#fff', fontWeight: 'bold' }}
            >
              here #{feedbackResponse.number}
            </a>
          </p>
        ),
      })
    );
  };
}
