import Cookies from 'js-cookie';

export const TOKEN_KEY = 'token';

export const setToken = (value) => {
  const inFifteenMinutes = new Date(new Date().getTime() + (15 * 60 * 1000));
  Cookies.set(TOKEN_KEY, value, {
    expires: inFifteenMinutes,
  });
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  return '';
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
