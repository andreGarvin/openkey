import produce from 'immer';

const initialState = {
  response: undefined,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ERROR': {
      return produce(state, (draftState) => {
        draftState.response = payload;
      });
    }

    case 'REMOVE_ERROR': {
      return produce(state, (draftState) => {
        draftState.response = undefined;
      });
    }

    default:
      return state;
  }
}
