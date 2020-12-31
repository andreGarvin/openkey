import produce from 'immer';

const initialState = {
  response: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_FORM_ERRORS': {
      return produce(state, (draftState) => {
        draftState.response = payload;
      });
    }

    case 'REMOVE_FORM_ERRORS': {
      return produce(state, (draftState) => {
        draftState.response = [];
      });
    }

    case 'REMOVE_FORM_ERROR': {
      return produce(state, (draftState) => {
        draftState.response = draftState.response.filter((error) => {
          return error.field !== payload;
        });
      });
    }

    default:
      return state;
  }
}
