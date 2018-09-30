import routes from '@/router/routes';
import { getMenuByRoutes } from '_lib/router';

export default {
  state: {
    menuList: [],
  },
  actions: {
  },
  mutations: {
  },
  getters: {
    menuList(state, getters, rootState) {
      state.menuList = getMenuByRoutes(routes, rootState.user.userAuth);
      return state.menuList;
    },
  },
};
