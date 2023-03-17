import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({ game: gameReducer, login: loginReducer });

export default rootReducer;
