import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import { getToken } from '_lib/storage';
import { setTitle } from '_lib/tools';
import { LOGIN_PAGE_NAME } from '@/conf';
import { routes } from './routes';
import store from './../store';

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
  if (token) {
    if (!store.state.router.hasGetAuthRoutes) {
      store.dispatch('user/gaveUserInfo', { token }).then(({ page }) => {
        store.dispatch({
          type: 'router/concatRoutes',
          page,
        }).then((res) => {
          router.addRoutes(res);
          next({ ...to, replace: true });
        }).catch(() => {
          next({ name: 'login' });
        });
      });
    } else {
      next();
    }
  } else if (to.name === LOGIN_PAGE_NAME) {
    next();
  } else {
    next({ name: 'login' });
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
export default router;
