import VLogin from '@/views/auth/VLogin/index.vue';
import VSignUp from '@/views/auth/VSignUp/index.vue';
import VForgotPassword from '@/views/auth/VForgotPassword/index.vue';

export const LOGIN_ROUTE = {
  name: 'AUTH_LOGIN',
  path: '/auth/login',
  component: VLogin,
};
export const SIGNUP_ROUTE = {
  name: 'AUTH_SIGNUP',
  path: '/auth/sign-up',
  component: VSignUp,
};
export const FORGOT_PASSWORD_ROUTE = {
  name: 'FORGOT_PASSWORD',
  path: '/auth/forgot-password',
  component: VForgotPassword,
};

export const routes = [LOGIN_ROUTE, SIGNUP_ROUTE, FORGOT_PASSWORD_ROUTE];
