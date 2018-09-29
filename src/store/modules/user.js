import Storage from 'best-storage';
import { login, getUserInfo } from '@/api/user';
import { setToken } from '_lib/storage';
import { SETTOKEN, SETUSERINFO, SETUSERAUTH } from './../types';

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    userAuth: {},
  },
  actions: {
    sendLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then((res) => {
          if (res.data) {
            const { token } = res.data;
            commit(SETTOKEN, token);
            resolve(token);
          } else {
            reject(new Error(res.message));
          }
        });
      });
    },
    gaveUserInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        getUserInfo(data).then((res) => {
          console.log(res);
          if (res.data) {
            const resp = res.data;
            commit(SETUSERINFO, resp.user);
            commit(SETUSERAUTH, resp.auth);
            commit(SETTOKEN, resp.user.token);
            resolve(res.data.auth);
          } else {
            reject(new Error(res.message));
          }
        });
      });
    },
  },
  mutations: {
    [SETTOKEN](state, token) {
      state.token = token;
      setToken(token);
    },
    [SETUSERINFO](state, userInfo) {
      state.userInfo = Object.assign({}, userInfo);
      Storage.set('userInfo', JSON.stringify(userInfo));
    },
    [SETUSERAUTH](state, userAuth) {
      state.userAuth = Object.assign({}, userAuth);
      Storage.set('userAuth', JSON.stringify(userAuth));
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    userInfo(state) {
      return state.userInfo;
    },
    userAuth(state) {
      return state.userAuth;
    },
  },
};

