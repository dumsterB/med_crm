import VLogin from '@/views/auth/VLogin/index.vue';
import VSignUp from '@/views/auth/VSignUp/index.vue';
import VForgotPassword from '@/views/auth/VForgotPassword/index.vue';

import { onlyLoggedOutMiddleware } from '@/middlewares/onlyLoggedOut.middleware';

export const LOGIN_ROUTE = {
  name: 'AUTH_LOGIN',
  path: '/auth/login',
  component: VLogin,
  beforeEnter: [onlyLoggedOutMiddleware],
};
export const SIGNUP_ROUTE = {
  name: 'AUTH_SIGNUP',
  path: '/auth/sign-up',
  component: VSignUp,
  beforeEnter: [onlyLoggedOutMiddleware],
};
export const FORGOT_PASSWORD_ROUTE = {
  name: 'FORGOT_PASSWORD',
  path: '/auth/forgot-password',
  component: VForgotPassword,
  beforeEnter: [onlyLoggedOutMiddleware],
};

export const routes = [LOGIN_ROUTE, SIGNUP_ROUTE, FORGOT_PASSWORD_ROUTE];
