import { onlyLoggedInMiddleware } from '@/middlewares/onlyLoggedIn.middleware';
import VDashboard from '@/views/registry/VDashboard/index.vue';
import VPatients from '@/views/registry/VPatients/index.vue';
import VPatientsRecords from '@/views/registry/VPatientsRecords/index.vue';
import VDoctorsSchedule from '@/views/registry/VDoctorsSchedule/index.vue';

export const REGISTRY_DASHBOARD_ROUTE = {
  name: 'REGISTRY_DASHBOARD',
  path: '/registry/dashboard',
  component: VDashboard,
  beforeEnter: [onlyLoggedInMiddleware],
};
export const REGISTRY_PATIENTS_ROUTE = {
  name: 'REGISTRY_PATIENTS',
  path: '/registry/patients',
  component: VPatients,
  beforeEnter: [onlyLoggedInMiddleware],
};
export const REGISTRY_PATIENTS_RECORDS_ROUTE = {
  name: 'REGISTRY_PATIENTS_RECORDS',
  path: '/registry/patients-records',
  component: VPatientsRecords,
  beforeEnter: [onlyLoggedInMiddleware],
};
export const REGISTRY_DOCTORS_SCHEDULE_ROUTE = {
  name: 'REGISTRY_DOCTORS_SCHEDULE',
  path: '/registry/doctors-schedule',
  component: VDoctorsSchedule,
  beforeEnter: [onlyLoggedInMiddleware],
};

export const routes = [
  REGISTRY_DASHBOARD_ROUTE,
  REGISTRY_PATIENTS_ROUTE,
  REGISTRY_PATIENTS_RECORDS_ROUTE,
  REGISTRY_DOCTORS_SCHEDULE_ROUTE,
];
