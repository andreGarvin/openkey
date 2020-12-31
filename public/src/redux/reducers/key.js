import produce from 'immer';

const initialState = {
  response: undefined,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_KEY': {
      return produce(state, (draftState) => {
        draftState.response = payload;
      });
    }

    default:
      return state;
  }
}
