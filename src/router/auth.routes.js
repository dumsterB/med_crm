import V_Login from '@/views/auth/V_Login/index.vue';
import V_SignUp from '@/views/auth/V_SignUp/index.vue';

export const LOGIN_ROUTE = {
  name: 'AUTH_LOGIN',
  path: '/auth/login',
};
export const SIGNUP_ROUTE = {
  name: 'AUTH_SIGNUP',
  path: '/auth/sign-up',
};

export const routes = [
  {
    name: LOGIN_ROUTE.name,
    path: LOGIN_ROUTE.path,
    component: V_Login,
  },
  {
    name: SIGNUP_ROUTE.name,
    path: SIGNUP_ROUTE.path,
    component: V_SignUp,
  },
];
