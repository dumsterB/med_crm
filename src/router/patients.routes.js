import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { onlyManagerMiddleware } from '@/middlewares/onlyManager.middleware';
import { I18nService } from '@/services/i18n.service';

export const PATIENTS_ROUTE = {
  name: 'PATIENTS',
  path: '/patients',
  component: 'VPatients',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Patients'),
  },
};
export const PATIENT_ROUTE = {
  name: 'PATIENT',
  path: '/patients/:id',
  component: 'VPatient',
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Patient'),
  },
  props: true,
};

export const routes = [PATIENTS_ROUTE, PATIENT_ROUTE];
