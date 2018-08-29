import routes from '@/router/routes'
import {getMenuByRouter, getHomeRoute, getBreadCrumbList, routeHasExist} from '@/utils/dt-util-router'
import {getTagNavListFromLocalStorage, setTagNavListFromLocalStorage} from '@/utils/dt-storage-tag-nav'

export default {
  state: {
    menuList: [],
    homeRoute: getHomeRoute(routes),
    breadCrumbList: [],
    tagNavList: []
  },
  actions: {},
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList (state, arr) {
      if (arr) {
        state.tagNavList = [...arr]
        setTagNavListFromLocalStorage(arr)
      } else {
        state.tagNavList = getTagNavListFromLocalStorage()
      }
    },
    addTag (state, {route, type = 'unshift'}) {
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === 'push') state.tagNavList.push(route)
        else {
          if (route.name === 'home') state.tagNavList.unshift(route)
          else state.tagNavList.splice(1, 0, route)
        }
        setTagNavListFromLocalStorage([...state.tagNavList])
      }
    }
  },
  getters: {
    homeRoute (state) {
      return state.homeRoute
    },
    menuList (state, getters, rootState) {
      return getMenuByRouter(routes, rootState.user.access)
    },
    breadCrumbList (state) {
      return state.breadCrumbList
    },
    tagNavList (state) {
      return state.tagNavList
    }
  }
}
