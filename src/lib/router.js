import { hasOneOf } from '_lib/tools';
import { objEqual } from '_lib/utils';

/**
 * @description 判断当前路由是否有权限访问
 * @param rules
 * @param route
 * @returns {*}
 * @author Duantong
 */
export const hasPermission = (rules, route) => {
  if (route.meta && route.meta.access) {
    return hasOneOf(rules, route.meta.access);
  }
  return true;
};

/**
 * @description 路由鉴权
 * @param name
 * @param rules
 * @param routes
 * @returns {*}
 * @author Duantong
 */
export const isPermission = (name, rules, routes) => {
  /* eslint-disable-next-line */
  const routePermission = list => list.some((item) => {
    if (item.children && item.children.length > 0) {
      return routePermission(item.children);
    } else if (item.name === name) {
      return hasPermission(rules, item);
    }
  });
  return routePermission(routes);
};
/**
 * @description 判断一个元素是否含有子元素
 * @param item
 * @returns {*|boolean}
 * @author Duantong
 */
export const hasChild = item => item.children && item.children.length > 0;

/**
 * @description 判断当前路由是否可以通过权限认证
 * @param item
 * @param rules
 * @returns {boolean}
 * @author Duantong
 */
export const isShowMenuEle = (item, rules) => {
  if (item.meta && item.meta.access && item.meta.access.length !== 0) {
    if (hasOneOf(item.meta.access, rules)) {
      return true;
    }
    return false;
  }
  return true;
};

/**
 * @description 根据iView组件Menu组件组合心的侧边栏路由
 * @param routes
 * @param rules
 * @return {ObjectRoutes}
 * @author Duantong
 */
export const getMenuByRoutes = (routes, rules) => {
  const res = [];
  routes.forEach((item) => {
    if (!item.meta || (item.meta && !item.meta.hideMenu)) {
      const obj = {
        name: item.name,
        meta: item.meta,
      };
      if ((hasChild(item) || (item.meta && item.meta.always)) && isShowMenuEle(item, rules)) {
        obj.children = getMenuByRoutes(item.children, rules);
      }
      if (item.meta && item.meta.href) {
        obj.href = item.meta.href;
      }
      if (isShowMenuEle(item, rules)) {
        res.push(obj);
      }
    }
  });
  return res;
};
/**
 * @description 面包屑导航，过滤路由信息
 * @param route
 * @param homeRoute
 * @returns {*[]}
 * @author Duantong
 */
export const getBreadCrumbList = (route, homeRoute) => {
  const routeMetched = route.matched;
  console.log(routeMetched);
  const result = routeMetched.filter(item => (item.meta === undefined || !item.meta.hide))
    .map((item) => {
      const meta = { ...item.meta };
      if (meta.title && typeof meta.title === 'function') {
        meta.title = meta.title(route);
      }
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta,
      };
      return obj;
    });
  const res = result.filter(item => !item.meta.hideMenu).filter(item => item.name !== 'home').filter(item => item.name !== '_home');
  const home = Object.assign({}, homeRoute, { to: homeRoute.path });
  console.log([home, ...res]);
  return [home, ...res];
};

/**
 * @description 获取首页路由信息
 * @param routers
 * @return { homeRoute }
 * @author Duantong
 */
export const getHomeRoute = (routers) => {
  let i = -1;
  const len = routers.length;
  let homeRoute = {};
  while (++i < len) { /* eslint-disable-line */
    const item = routers[i];
    if (item.children && item.children.length) {
      const res = getHomeRoute(item.children);
      if (res.name) {
        return res;
      }
    }
    if (item.name === 'home') {
      homeRoute = item;
    }
  }
  return homeRoute;
};

/**
 * @description 判断路由是动态路由还是静态路由，并把meta信息重新赋值给新的路由变量
 * @param route
 * @returns {{}}
 * @author Duantong
 */
export const getRouteTitleHandled = (route) => {
  const router = { ...route };
  const meta = { ...route.meta };
  if (meta.title && typeof meta.title === 'function') {
    meta.title = meta.title(router);
  }
  router.meta = meta;
  return router;
};

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2);
};

/**
 * @description 查看路由对象中是否包含某一个选中的路由
 * @param navTaglist
 * @param routeItem
 * @returns {boolean}
 * @author Duantong
 */
export const routeHasExist = (tagNavlist, routeItem) => {
  console.log(tagNavlist);
  const len = tagNavlist.length;
  let res = false;
  routeHasExist(len, (index) => {
    if (routeEqual(tagNavlist[index], routeItem)) {
      res = true;
    }
  });
  return res;
};
