import some from 'lodash/some'
import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import map from 'lodash/map'
/**
 *
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 路由权鉴, 用户是否可跳转到该页
 */
export const isPermission = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return some(list, item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }
  return routePermissionJudge(routes)
}
/**
 * @description 页面是否能够通过鉴权，如果没有meta或者没有access说明用户都可访问
 * @param access 用户可访问权限
 * @param route  当前路由
 * @returns {Boolean} 是否通过鉴权
 */
export const hasAccess = (access, route) => {
  if (route.meta && route.meta.access && route.meta.access.length > 0) {
    return hasOneOf(access, route.meta.access)
  } else {
    return true
  }
}
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => {
  return target.some(_ => arr.indexOf(_) > -1)
}
/**
 *
 * @param routes
 * @param access
 */
export const getMenuByRouter = (routes, access) => {
  const res = []
  forEach(routes, item => {
    // 说明用户不需要权限就能访问 或者说用户不需要访问这个隐藏的路由
    if (!item.meta || (item.meta && !item.meta.isMenuHidden)) {
      const obj = {
        name: item.name,
        meta: item.meta,
        icon: item.meta && item.meta.icon
      }
      if ((hasChild(item) || (item.meta && item.meta.always)) && showThisMenuElement(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuElement(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @description 判断父级路由是否含有子元素
 * @param item
 * @returns {*|boolean}
 */
export const hasChild = (item) => {
  return item.children && item.children.length > 0
}

/**
 * @description 是否可以通过权限
 * @param item
 * @param access
 * @returns {boolean}
 */
export const showThisMenuElement = (item, access) => {
  if (item.meta && item.meta.access) {
    if (hasOneOf(item.meta.access, access)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

/**
 * @description 查找首页的路由
 * @param routers
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') homeRoute = item
    }
  }
  return homeRoute
}
/**
 * @param matchedRoutes
 * @param homeRoute
 * @returns {*[]}
 */
export const getBreadCrumbList = (matchedRoutes, homeRoute) => {
  const filterHideRoutes = filter(matchedRoutes, item => {
    return item.meta && !item.meta.hide
  })
  const formatRoutes = map(filterHideRoutes, item => {
    const obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  }).filter(item => item.name !== '_home').filter(item => item.name !== 'home')
  const filterHiddenMenu = filter(formatRoutes, item => !item.meta.isMenuHidden)
  return [Object.assign(homeRoute, {to: homeRoute.path}), ...filterHiddenMenu]
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta, query, params } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) {
    return newList
  } else {
    newList.push({ name, path, meta, query, params })
  }
  return newList
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}
