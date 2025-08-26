import produce from 'immer';

const initialState = {
  loading: false,
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
    
    case 'TOGGLE_LOADING': {
      return produce(state, (draftState) => {
        draftState.loading = !draftState.loading;
      });
    }

    default:
      return state;
  }
}
