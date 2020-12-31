import produce from 'immer';

const initialState = {
  number: '',
  url: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_FEEDBACK': {
      return produce(state, (draftState) => {
        draftState.feedback = payload;
      });
    }

    default:
      return state;
  }
}
