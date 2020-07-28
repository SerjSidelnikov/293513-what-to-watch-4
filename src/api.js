import axios from 'axios';
import history from './history';

const Error = {
  UNAUTHORIZED: 401,
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      history.push(`/login`);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
