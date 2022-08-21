import { onlyLoggedOutMiddleware } from '@/middlewares/onlyLoggedOut.middleware';
import { I18nService } from '@/services/i18n.service';

export const LOGIN_ROUTE = {
  name: 'AUTH_LOGIN',
  path: '/auth/login',
  component: 'VLogin',
  beforeEnter: [onlyLoggedOutMiddleware],
  meta: {
    title: I18nService.t('Base.Authorization'),
  },
};
export const SIGNUP_ROUTE = {
  name: 'AUTH_SIGNUP',
  path: '/auth/sign-up',
  component: 'VSignUp',
  beforeEnter: [onlyLoggedOutMiddleware],
  meta: {
    title: I18nService.t('Base.SignUp'),
  },
};
export const FORGOT_PASSWORD_ROUTE = {
  name: 'FORGOT_PASSWORD',
  path: '/auth/forgot-password',
  component: 'VForgotPassword',
  beforeEnter: [onlyLoggedOutMiddleware],
  meta: {
    title: I18nService.t('Base.ForgotPassword'),
  },
};

export const routes = [LOGIN_ROUTE, SIGNUP_ROUTE, FORGOT_PASSWORD_ROUTE];
