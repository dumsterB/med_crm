import { Store } from '@/store';
import { User } from '@/models/User.model';

export const onlyDoctorMiddleware = function (to, from, next) {
  const isDoctor = Store.state.auth.user.role === User.enum.roles.Doctor;

  return next(isDoctor ? '' : '/');
};
