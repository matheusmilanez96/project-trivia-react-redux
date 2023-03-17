import { SAVE_TOKEN } from '../actions/gameActions';

const INITIAL_STATE = {
  responseCode: 0,
  questions: [],
  token: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case SAVE_TOKEN:
    return {
      ...state,
      token: payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
