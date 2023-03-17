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

export const getQuestions = () => async (dispatch, getState) => {
  const { token } = getState().game;
  const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const result = await (await fetch(API_URL)).json();
  dispatch(saveAPIResponse(result));
};
