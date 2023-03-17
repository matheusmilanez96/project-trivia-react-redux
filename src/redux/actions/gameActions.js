import { startFetching, successRequest } from './loginActions';

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_API_RESPONSE = 'SAVE_API_RESPONSE';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

const saveAPIResponse = ({ results, response_code: responseCode }) => ({
  type: SAVE_API_RESPONSE,
  payload: {
    results,
    responseCode,
  },
});

export const getToken = () => async (dispatch) => {
  dispatch(startFetching());
  const token = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
  localStorage.setItem('token', token.token);
  dispatch(saveToken(token.token));
  dispatch(successRequest());
};

export const getQuestions = () => async (dispatch, getState) => {
  const { token } = getState().game;
  const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const result = await (await fetch(API_URL)).json();
  dispatch(saveAPIResponse(result));
};
