import Cookies from 'js-cookie';
import storage from 'best-storage';

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

export const storageGetInfo = info => storage.get(info);

// export const storageSetInfo = (info, data) = storage.set(info, data);

/**
 * @description 本地存储和获取标签导航列表
 * @author Duantong
 */
export const setTagNavListInSessionstorage = (list) => {
  storage.session.set('tagNavList', list);
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 * @author Duantong
 */
export const getTagNavListFromSessionstorage = () => {
  const list = storage.session.get('tagNavList');
  if (list && list.length > 0) {
    return list;
  }
  return [];
};
