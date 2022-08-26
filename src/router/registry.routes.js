import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { onlyManagerMiddleware } from '@/middlewares/onlyManager.middleware';
import { I18nService } from '@/services/i18n.service';

export const REGISTRY_PATIENTS_ROUTE = {
  name: 'REGISTRY_PATIENTS',
  path: '/registry/patients',
  component: 'VPatients',
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.Patients'),
  },
};
export const REGISTRY_PATIENT_ROUTE = {
  name: 'REGISTRY_PATIENT',
  path: '/registry/patients/:id',
  component: 'VPatient',
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.Patient'),
  },
  props: true,
};

export const routes = [REGISTRY_PATIENTS_ROUTE, REGISTRY_PATIENT_ROUTE];
