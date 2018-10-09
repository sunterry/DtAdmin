import routes from '@/router/routes';
import {
  getMenuByRoutes,
  getBreadCrumbList,
  getHomeRoute,
  getRouteTitleHandled,
  routeHasExist,
} from '_lib/router';
import {
  setTagNavListInSessionstorage,
  getTagNavListFromSessionstorage,
} from '_lib/storage';

export default {
  state: {
    menuList: [],
    breadCrumbList: [],
    homeRoute: getHomeRoute(routes),
    tagNavList: [],
  },
  actions: {
  },
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
    setTagNavList(state, list) {
      if (list) {
        state.tagNavList = [...list];
        setTagNavListInSessionstorage([...list]);
      } else state.tagNavList = getTagNavListFromSessionstorage();
    },
    addTag(state, { route, type = 'unshift' }) {
      const router = getRouteTitleHandled(route);
      if (!routeHasExist(state.tagNavList, router)) {
        /* eslint-disable */
        if (type === 'push') {
          state.tagNavList.push(router);
        } else {
          if (router.name === 'home') state.tagNavList.unshift(router);
          else state.tagNavList.splice(1, 0, router);
        }
        setTagNavListInSessionstorage([...state.tagNavList]);
      }
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
    homeRoute(state) {
      return state.homeRoute;
    },
    tagNavList(state) {
      return state.tagNavList;
    },
  },
};
