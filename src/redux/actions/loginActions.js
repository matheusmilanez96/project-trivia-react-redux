export const SAVE_PERSONAL_INFO = 'SAVE_PERSONAL_INFO';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const FETCHING = 'FETCHING';
export const SUCESS_REQUEST = 'SUCESS_REQUEST';

export const savePersonalInfo = ({ name, email }) => ({
  type: SAVE_PERSONAL_INFO,
  payload: { name, email },
});

export const startFetching = () => ({
  type: FETCHING,
});

export const successRequest = () => ({
  type: SUCESS_REQUEST,
});
