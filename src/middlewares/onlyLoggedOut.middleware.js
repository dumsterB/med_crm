import { Store } from '@/store/index.js';

export const onlyLoggedOutMiddleware = function (to, from, next) {
  if (Store.state.auth.isAuthorized) return next('/');
  next();
};
