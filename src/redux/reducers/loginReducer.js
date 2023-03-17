import { FETCHING, SAVE_PERSONAL_INFO, SUCESS_REQUEST } from '../actions/loginActions';

const INITIAL_STATE = {
  name: '',
  email: '',
  loading: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case SAVE_PERSONAL_INFO:
    return { ...state, ...payload };
  case FETCHING:
    return { ...state, loading: true };
  case SUCESS_REQUEST:
    return { ...state, loading: false };
  default:
    return state;
  }
};

export default loginReducer;
