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
    addTag(state, { route, type = 'unshift' }) {
      const router = getRouteTitleHandled(route);
      routeHasExist(state.tagNavList, router);
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') {
          state.tagNavList.push(router);
        }
        if (router.name === 'home') {
          state.tagNavList.unshift(router);
        } else {
          state.tagNavList.splice(1, 0, router);
        }
        setTagNavListInSessionstorage([...state.tagNavList]);
      }
    },
    setTagNavList(state, list) {
      if (list) {
        state.tagNavList = [...list];
        setTagNavListInSessionstorage([...list]);
      }
      state.tagNavList = getTagNavListFromSessionstorage();
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
