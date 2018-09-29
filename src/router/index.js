import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import { getToken, removeToken } from '_lib/storage';
import { setTitle } from '_lib/tools';
import { LOGIN_PAGE_NAME } from '@/conf';
import store from '@/store';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.meta) {
    setTitle(to.meta.title);
  }
  const token = getToken();
  console.log(token);
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    console.log(1);
    next({
      name: 'login',
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    console.log(2);
    next();
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    console.log(3);
    next({
      name: 'home',
    });
  } else if (store.state.user.hasGetUserInfo) {
    console.log(4);
    next();
  } else {
    store.dispatch({
      type: 'user/gaveUserInfo',
    }).then((user) => {
      console.log(user);
      next();
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
