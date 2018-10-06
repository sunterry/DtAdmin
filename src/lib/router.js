import { hasOneOf } from '_lib/tools';

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
 * @description 面包屑导航
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
