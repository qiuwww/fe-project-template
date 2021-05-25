export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'login',
        icon: 'smile',
        path: '/user/login',
        component: './user/login',
      },
      // {
      //   name: 'register-result',
      //   icon: 'smile',
      //   path: '/user/register-result',
      //   component: './user/register-result',
      // },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/Register',
      },
      {
        name: 'forgetPassword',
        icon: 'smile',
        path: '/user/forget-password',
        component: './user/ForgetPassword',
      },
      {
        name: 'accountActivation',
        icon: 'smile',
        path: '/user/account-activation',
        component: './user/AccountActivation',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/media-management/media',
      },
      // { path: '/', component: '../pages/index' },
      { path: '/media-management/media', component: './management/Media' },
      {
        component: '404',
      },
    ],
  },
];
