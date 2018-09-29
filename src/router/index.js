import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import { getToken } from '_lib/storage';
import { LOGIN_PAGE_NAME } from '@/conf';
import routes from './routes';
import store from './../store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  const token = getToken();
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录并且要跳转的页面不是登录页面
    next({
      name: LOGIN_PAGE_NAME,
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    next();
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({
      name: 'home',
    });
  } else {
    store.dispatch('user/getUserInfo', { token }).then(() => {
      next();
    });
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
export default router;
