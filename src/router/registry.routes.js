import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import { I18nService } from '@/services/i18n.service';
import VDashboard from '@/views/registry/VDashboard/index.vue';
import VPatients from '@/views/registry/VPatients/index.vue';
import VAppointments from '@/views/registry/VAppointments/index.vue';
import VPatient from '@/views/registry/VPatient/index.vue';
import VPatientRecord from '@/views/registry/VPatientRecord/index.vue';

export const REGISTRY_DASHBOARD_ROUTE = {
  name: 'REGISTRY_DASHBOARD',
  path: '/registry/dashboard',
  component: VDashboard,
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Dashboard'),
  },
};

export const REGISTRY_PATIENTS_ROUTE = {
  name: 'REGISTRY_PATIENTS',
  path: '/registry/patients',
  component: VPatients,
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Patients'),
  },
};
export const REGISTRY_PATIENT_ROUTE = {
  name: 'REGISTRY_PATIENT',
  path: '/registry/patients/:id',
  component: VPatient,
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.Patient'),
  },
  props: true,
};
export const REGISTRY_PATIENT_RECORD_ROUTE = {
  name: 'REGISTRY_PATIENT_RECORD',
  path: '/registry/patients/:patientId/records/:id',
  component: VPatientRecord,
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.PatientRecord'),
  },
  props: true,
};

export const REGISTRY_PATIENTS_RECORDS_ROUTE = {
  name: 'REGISTRY_PATIENTS_RECORDS',
  path: '/registry/patients-records',
  component: VAppointments,
  beforeEnter: [onlyLoggedInMiddleware],
  meta: {
    title: I18nService.t('Base.PatientsRecords'),
  },
};

export const routes = [
  REGISTRY_DASHBOARD_ROUTE,
  REGISTRY_PATIENTS_ROUTE,
  REGISTRY_PATIENT_ROUTE,
  REGISTRY_PATIENT_RECORD_ROUTE,
  REGISTRY_PATIENTS_RECORDS_ROUTE,
];
