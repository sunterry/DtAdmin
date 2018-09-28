import Cookies from 'js-cookie';
import Storage from 'best-storage';

export const TOKEN_KEY = 'token';

export const setToken = (value) => {
  const inFifteenMinutes = new Date(new Date().getTime() + (15 * 60 * 1000));
  Cookies.set(TOKEN_KEY, value, {
    expires: inFifteenMinutes,
  });
  // Cookies.set(TOKEN_KEY, value, { expires: 3 });
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  return '';
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const getStroage = name => Storage.get(name);

export const setStroage = (val) => {
  if (typeof val === 'object') {
    Storage.set(JSON.stringify(val));
  } else {
    Storage.set(val);
  }
};

export const removeStroage = name => Storage.remove(name);
