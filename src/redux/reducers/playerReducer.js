import { INCREASE_SCORE } from '../actions/playerActions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case INCREASE_SCORE: {
    const scoreConst = 10;
    const { difficulty, remaining } = payload;
    return {
      ...state,
      score: scoreConst + (remaining * difficulty),
    };
  }
  default:
    return state;
  }
};

export default playerReducer;
