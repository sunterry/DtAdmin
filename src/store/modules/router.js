import cloneDeep from 'clone-deep';
import { routes, dynamicRoutes } from '@/router/routes';
import { getDynamicRoutes } from '_lib/utils';
import { SETDYNAMIC } from './../types';

export default {
  namespaced: true,
  state: {
    hasGetAuthRoutes: false,
    routers: routes,
  },
  actions: {
    concatRoutes({ commit, state }, rules) {
      return new Promise((resolve, reject) => {
        try {
          let routerList = [];
          if (Object.entries(rules).every(_ => _[1])) {
            routerList = cloneDeep(dynamicRoutes);
          } else {
            routerList = getDynamicRoutes(dynamicRoutes, rules);
          }
          commit(SETDYNAMIC, routerList);
          resolve(state.routers);
        } catch (e) {
          reject(new Error(e));
        }
      });
    },
  },
  mutations: {
    [SETDYNAMIC](state, routerList) {
      state.routers = state.routers.concat(routerList);
      state.hasGetAuthRoutes = true;
    },
  },
  getters: {},
};
