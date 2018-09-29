import DashBoard from '_c/dt-dashboard';

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue'),
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: DashBoard,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];
