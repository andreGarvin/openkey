import produce from 'immer';

const initialState = {
  report_id: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_REPORT': {
      return produce(state, (draftState) => {
        draftState.report = payload;
      });
    }

    default:
      return state;
  }
}
