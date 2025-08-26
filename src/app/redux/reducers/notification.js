import produce from 'immer';

const initialState = {
  payload: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_NOTIFICATION': {
      return produce(state, (draftState) => {
        draftState.payload = payload;
      });
    }

    case 'REMOVE_NOTIFICATION': {
      return produce(state, (draftState) => {
        draftState.payload = {};
      });
    }

    default:
      return state;
  }
}
