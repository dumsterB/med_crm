import { onlyDoctorMiddleware } from '@/middlewares/onlyDoctor.middleware';
import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { I18nService } from '@/services/i18n.service';

export const DOCTORS_QUEUE_ROUTE = {
  name: 'DOCTORS_QUEUE',
  path: '/doctors/queue',
  component: 'VQueues',
  beforeEnter: [onlyLoggedInMiddleware, onlyDoctorMiddleware],
  meta: {
    title: I18nService.t('Base.Queue'),
  },
};

export const DOCTORS_SETTINGS_ROUTE = {
  name: 'DOCTORS_SETTINGS',
  path: '/profile/settings',
  component: 'VSettings',
  beforeEnter: [onlyLoggedInMiddleware, onlyDoctorMiddleware],
  meta: {
    title: I18nService.t('Base.Settings'),
  },
};

export const routes = [DOCTORS_QUEUE_ROUTE, DOCTORS_SETTINGS_ROUTE];
