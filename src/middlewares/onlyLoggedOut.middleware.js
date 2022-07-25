import { Store } from '@/store/index.js';
import { REGISTRY_DASHBOARD_ROUTE } from '@/router/registry.routes';

export const onlyLoggedOutMiddleware = function (to, from, next) {
  if (Store.state.auth.isAuthorized) return next(REGISTRY_DASHBOARD_ROUTE.path);
  next();
};
