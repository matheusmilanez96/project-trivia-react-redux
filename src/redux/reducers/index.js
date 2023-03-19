import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import loginReducer from './loginReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  login: loginReducer,
  player: playerReducer,
});

export default rootReducer;
