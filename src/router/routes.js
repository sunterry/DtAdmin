import DashBoard from '_c/dt-dashboard';

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideMenu: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue'),
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    meta: {
      title: '首页',
    },
    component: DashBoard,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          icon: 'home',
          noCache: true,
          title: '首页',
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于我们',
      access: ['about'],
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/error_401',
    name: 'error_401',
    meta: {
      title: '错误页面',
      hideMenu: true,
    },
    component: () => import(/* webpackChunkName: "error_401" */ '../views/error/error_401.vue'),
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      title: '未找到该页面',
      hideMenu: true,
    },
    component: () => import(/* webpackChunkName: "error_404" */'../views/error/error_404.vue'),
  },
];