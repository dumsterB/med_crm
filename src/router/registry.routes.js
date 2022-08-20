import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { onlyManagerMiddleware } from '@/middlewares/onlyManager.middleware';
import { I18nService } from '@/services/i18n.service';
import VDashboard from '@/views/registry/VDashboard/index.vue';
import VPatients from '@/views/registry/VPatients/index.vue';
import VPatient from '@/views/registry/VPatient/index.vue';

export const REGISTRY_DASHBOARD_ROUTE = {
  name: 'REGISTRY_DASHBOARD',
  path: '/registry/dashboard',
  component: VDashboard,
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.Dashboard'),
  },
};

export const REGISTRY_PATIENTS_ROUTE = {
  name: 'REGISTRY_PATIENTS',
  path: '/registry/patients',
  component: VPatients,
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.Patients'),
  },
};
export const REGISTRY_PATIENT_ROUTE = {
  name: 'REGISTRY_PATIENT',
  path: '/registry/patients/:id',
  component: VPatient,
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.Patient'),
  },
  props: true,
};

export const routes = [REGISTRY_DASHBOARD_ROUTE, REGISTRY_PATIENTS_ROUTE, REGISTRY_PATIENT_ROUTE];
