import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import routes from './routes'
import store from '@/store'
import {getStorage} from '@/utils/dt-storage'
import setAuthorizationToken from '@/utils/dt-authorization'
import {isPermission} from '@/utils/dt-util-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getStorage('token')
  setAuthorizationToken(token)
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到home页
    })
  } else {
    store.dispatch('getUserInfo').then(user => {
      console.log(user)
      if (isPermission(to.name, user.access, routes)) next()
      else next({ replace: true, name: 'error_401' })
    })
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
