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
      score: state.score + scoreConst + (remaining * difficulty),
      assertions: state.assertions + 1,
    };
  }

  default:
    return state;
  }
};

export default playerReducer;
