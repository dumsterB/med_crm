import { Store } from '@/store';
import { LOGIN_ROUTE } from '@/router/auth.routes';

export const onlyLoggedInMiddleware = function (to, from, next) {
  if (Store.state.auth.isAuthorized) return next();
  next(LOGIN_ROUTE.path);
};
