import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import { getToken, removeToken } from '_lib/storage';
import { setTitle } from '_lib/tools';
import { isPermission } from '_lib/router';
import { LOGIN_PAGE_NAME } from '@/conf';
import store from '@/store';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export const jumpTo = (to, access, next) => {
  if (isPermission(to.name, access, routes)) {
    next();
  } else {
    next({
      name: 'error_401',
      replace: true,
    });
  }
};


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.meta) {
    setTitle(to.meta.title);
  }
  const token = getToken();
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: 'login',
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    next();
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({
      name: 'home',
    });
  } else if (store.state.user.hasGetUserInfo) {
    const { auth } = store.state.user;
    jumpTo(to, auth, next);
  } else {
    store.dispatch('gaveUserInfo').then((user) => {
      const { auth } = user;
      jumpTo(to, auth, next);
    }).catch(() => {
      removeToken();
      next({
        name: 'login',
      });
    });
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
export default router;
