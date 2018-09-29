/**
 * @description 动态路由过滤权限
 * @param list
 * @param rules
 * @returns {*[]}
 */
export const getDynamicRoutes = (list, rules) => list.filter((item) => {
  if (rules[item.name]) {
    if (item.children) {
      item.children = getDynamicRoutes(item.children, rules);
    }
    return true;
  }
  return false;
});

export const a = 10;
