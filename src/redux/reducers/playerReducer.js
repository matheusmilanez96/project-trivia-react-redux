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
<<<<<<< HEAD
      score: state.score + scoreConst + (remaining * difficulty),
      assertions: state.assertions + 1,
=======
      assertions: state.assertions + 1,
      score: state.score + scoreConst + (remaining * difficulty),
>>>>>>> 2f1f9dcad9c1223532ed7bc534a2c0541fc3c229
    };
  }

  default:
    return state;
  }
};

export default playerReducer;
