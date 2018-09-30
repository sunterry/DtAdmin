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

