import { login, getUserInfo } from '@/api/user';
import { SETTOKEN, SETUSERINFO, SETUSERAUTH } from './../types';

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    userAuth: {},
  },
  mutations: {
    [SETTOKEN](state, token) {
      state.token = token;
    },
    [SETUSERINFO](state, userInfo) {
      state.userInfo = Object.assign({}, userInfo);
    },
    [SETUSERAUTH](state, userAuth) {
      state.userAuth = [...userAuth];
    },
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
    getUserInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        getUserInfo(data).then((res) => {
          if (res.data) {
            commit(SETUSERINFO, res.data.user);
            commit(SETUSERAUTH, res.data.auth);
            resolve();
          } else {
            reject(new Error(res.message));
          }
        });
      });
    },
  },
  getters: {},
};

