import produce from 'immer';

const initialState = {
  path: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_NAVIGATION': {
      return produce(state, (draftState) => {
        draftState.path = payload;
      });
    }

    case 'REMOVE_NAVIGATION': {
      return produce(state, (draftState) => {
        draftState.path = '';
      });
    }

    default:
      return state;
  }
}
