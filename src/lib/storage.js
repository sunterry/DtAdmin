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

/**
 * @description 获取本地存储信息
 * @param info
 * @returns {*}
 * @author DuanTong
 */
export const storageGetInfo = info => storage.get(info);

/**
 * @descriptio 设置本地存储信息
 * @param info
 * @param data
 * @author Duantong
 */
export const storageSetInfo = (info, data) => {
  if (Object.prototype.toString.call(data) === '[object Array]' || Object.prototype.toString.call(data) === '[object Object]') {
    storage.set(info, JSON.stringify(data));
  } else {
    storage.set(info, data);
  }
};

/**
 * @description 删除本地存储信息
 * @param info
 * @returns {*}
 */
export const storageRemoveInfo = info => storage.remove(info);

/**
 * @description 本地存储和获取标签导航列表
 * @author Duantong
 */
export const setTagNavListInSessionstorage = (list) => {
  storage.session.set('tagNavList', JSON.stringify(list));
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 * @author Duantong
 */
export const getTagNavListFromSessionstorage = () => {
  const list = storage.session.get('tagNavList');
  return list ? JSON.parse(list) : [];
};
