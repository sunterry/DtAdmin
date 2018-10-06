import routes from '@/router/routes';
import { getMenuByRoutes, getBreadCrumbList, getHomeRoute } from '_lib/router';

export default {
  state: {
    menuList: [],
    breadCrumbList: [],
    homeRoute: getHomeRoute(routes),
  },
  actions: {
  },
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
  },
  getters: {
    menuList(state, getters, rootState) {
      state.menuList = getMenuByRoutes(routes, rootState.user.userAuth);
      return state.menuList;
    },
    breadCrumbList(state) {
      return state.breadCrumbList;
    },
  },
};
