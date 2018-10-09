import { login, getUserInfo } from '@/api/user';
import { setToken, getToken, removeToken, storageSetInfo, storageRemoveInfo } from '_lib/storage';
import { SETTOKEN, SETUSERINFO, SETUSERAUTH, HASGETUSERINFO, LOGINOUT } from './../types';

export default {
  state: {
    token: getToken(),
    userInfo: {},
    userAuth: {},
    hasGetUserInfo: false,
  },
  actions: {
    sendLogin({ commit }, params) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await login(params);
          if (res.data) {
            const { token } = res.data;
            commit(SETTOKEN, token);
            resolve();
          } else {
            reject(new Error(res.message));
          }
        } catch (e) {
          reject(new Error(e));
        }
      });
    },
    gaveUserInfo({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await getUserInfo({ token: state.token });
          if (res.data) {
            const resp = res.data;
            commit(SETUSERINFO, resp.user);
            commit(SETUSERAUTH, resp.auth);
            commit(HASGETUSERINFO, true);
            resolve(resp);
          } else {
            reject(new Error(res.message));
          }
        } catch (e) {
          reject(new Error(e));
        }
      });
    },
    loginOut({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit(LOGINOUT);
          resolve();
        }, 32);
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
      storageSetInfo('userInfo', userInfo);
    },
    [SETUSERAUTH](state, userAuth) {
      state.userAuth = [...userAuth];
      storageSetInfo('userAuth', [...userAuth]);
    },
    [HASGETUSERINFO](state, status) {
      state.hasGetUserInfo = status;
    },
    [LOGINOUT](state) {
      storageRemoveInfo('userAuth');
      storageRemoveInfo('userInfo');
      removeToken();
      state.userAuth = [];
      state.userInfo = [];
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    userAuth(state) {
      return state.userAuth;
    },
  },
};

