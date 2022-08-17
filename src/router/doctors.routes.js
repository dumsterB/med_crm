import { onlyDoctorMiddleware } from '@/middlewares/onlyDoctor.middleware';
import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { I18nService } from '@/services/i18n.service';
import VQueue from '@/views/doctors/VQueue/index.vue';

export const DOCTORS_QUEUE_ROUTE = {
  name: 'DOCTORS_QUEUE',
  path: '/doctors/queue',
  component: VQueue,
  beforeEnter: [onlyLoggedInMiddleware, onlyDoctorMiddleware],
  meta: {
    title: I18nService.t('Base.Authorization'),
  },
};

export const routes = [DOCTORS_QUEUE_ROUTE];
