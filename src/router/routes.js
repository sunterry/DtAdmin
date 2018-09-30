import DashBoard from '_c/dt-dashboard';
import DtParentView from '_c/dt-parent-view';

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
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      title: '多级菜单',
      access: ['multilevel'],
    },
    component: DashBoard,
    children: [
      {
        path: 'multilevelOne',
        name: 'multilevelOne',
        meta: {
          access: ['multilevelOne'],
          title: '一级-1',
        },
        component: () => import(/* webpackChunkName: "multilevelOne" */ '../views/multilevel/multilevelOne.vue'),
      },
      {
        path: 'multilevelTwo',
        name: 'multilevelTwo',
        meta: {
          access: ['multilevelTwo'],
          title: '二级-1',
        },
        component: () => import(/* webpackChunkName: "multilevelTwo" */ '../views/multilevel/multilevelTwo.vue'),
      },
      {
        path: 'multilevelThree',
        name: 'multilevelThree',
        meta: {
          access: ['multilevelThree'],
          title: '二级-3',
          always: true,
        },
        component: DtParentView,
        children: [
          {
            path: 'multilevelThreeNext',
            name: 'multilevelThreeNext',
            meta: {
              title: '三级-1',
            },
            component: () => import(/* webpackChunkName: "multilevelThreeNext" */ '../views/multilevel/multilevelThreeNext.vue'),
          },
        ],
      },
    ],
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
