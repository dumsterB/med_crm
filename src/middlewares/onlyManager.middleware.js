import { Store } from '@/store';
import { User } from '@/models/User.model';

export const onlyManagerMiddleware = function (from, to, next) {
  const isManager = Store.state.auth.user.role === User.enum.roles.Manager;
  return next(isManager ? null : '/');
};
