import { markRaw } from 'vue';
import { mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import { DRAWER_DEFAULT_SIZE } from '@/config/ui.config';

import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { GlobalDrawerAction } from '@/models/client/ModalAndDrawer/GlobalDrawerAction';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';
import { Appointment } from '@/models/Appointment.model';
import { User } from '@/models/User.model';
import { Patient } from '@/models/Patient.model';
import { Doctor } from '@/models/Doctor.model';
import { Service } from '@/models/Service.model';
import { ServiceGroup } from '@/models/ServiceGroup.model';

import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import SpecialtiesSelect from '@/components/specialties/SpecialtiesSelect/index.vue';
import DoctorsSelectByGroupService from './DoctorsSelectByGroupService/index.vue';
import ScheduleSlotsSelect from '@/components/appointments/ScheduleSlotsSelect/index.vue';

// TODO: написать документацию по бизнес логике
export default {
  name: 'CreateOrEditAppointmentDrawer',
  components: {
    CreateOrEditPatientDrawer,
    SpecialtiesSelect,
    DoctorsSelectByGroupService,
    ScheduleSlotsSelect,
  },
  emits: ['update:modelValue', 'action'],
  props: {
    modelValue: Boolean,
    patient: [Patient, User, Object],
    data: [Appointment, Object],
  },
  data() {
    return {
      /** @type Appointment */
      appointment: null,
      appointmentType: Appointment.enum.types.Doctor,
      /** @type {Array<ServiceGroup>} */
      groupServices: [],
      loading: {
        form: false,
      },

      patientDrawer: {
        show: false,
        nameOrPhone: null,
        newPatient: null,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    permissions() {
      return {
        createPatient: this.user.role === User.enum.roles.Manager,
      };
    },

    appointmentFields() {
      return Object.keys(this.appointment);
    },
    appointmentFieldsFlexOrder() {
      return {
        patient: 1,
        type: 2,
        specialty: 3,
        groupService: 4,
        doctor: 5,
        service: 6,
        date: 7,
        actions: 8,
      };
    },

    patientsOptions() {
      return {
        searchQuery: {
          query_field: ['name', 'phone'],
        },
      };
    },

    specialtiesOptions() {
      return {
        isShow: this.appointmentType === this.appointmentTypesEnum.Doctor && !this.data,
        isDisabled: !this.appointment.patient_id,
        isRequired: this.appointmentType === this.appointmentTypesEnum.Doctor && !this.data,
      };
    },

    groupServicesOptions() {
      return {
        isShow: this.appointmentType === this.appointmentTypesEnum.Service,
        isDisabled:
          this.appointmentType === this.appointmentTypesEnum.Service
            ? !this.appointment.patient_id
            : true,
        searchQuery: {
          query_field: null,
          query_type: null,
          query_operator: null,
          some_services: true,
        },
      };
    },
    currentGroupService() {
      return this.groupServices.find((elem) => elem.id === this.appointment.group_service_id);
    },

    doctorsAndServicesOptions() {
      return {
        isShow: this.appointmentType === this.appointmentTypesEnum.Service,
        // isRequired: this.appointmentType === this.appointmentTypesEnum.Service,
        isRequired: false,
      };
    },

    doctorsOptions() {
      return {
        isShow: this.appointmentType === this.appointmentTypesEnum.Doctor,
        isDisabled:
          this.appointmentType === this.appointmentTypesEnum.Doctor
            ? this.data
              ? !this.appointment.patient_id
              : !this.appointment.specialty_id
            : false,
        isRequired: this.appointmentType === this.appointmentTypesEnum.Doctor,
        searchQuery: {
          specialties_id: this.appointment.specialty_id ? [this.appointment.specialty_id] : null,
        },
      };
    },

    servicesOptions() {
      return {
        isShow: this.appointmentType === this.appointmentTypesEnum.Doctor,
        isDisabled:
          this.appointmentType === this.appointmentTypesEnum.Doctor && !this.appointment.doctor_id,
        isRequired: this.appointmentType === this.appointmentTypesEnum.Doctor,
        searchQuery: {
          doctorId: this.appointment.doctor_id,
          query_field: null,
          query_type: null,
          query_operator: null,
        },
      };
    },

    slotsOptions() {
      return {
        isDisabled:
          this.appointmentType === this.appointmentTypesEnum.Doctor
            ? !this.appointment.service_id
            : !this.appointment.group_service_id,
        dependencies: {
          type: this.appointmentType,
          serviceId: this.appointment.service_id,
          doctorId: this.appointment.doctor_id,
        },
      };
    },
  },

  watch: {
    'modelValue': {
      handler() {
        this.appointment = new Appointment(this.data || { patient_id: this.patient?.id || null });
      },
      immediate: true,
      deep: true,
    },

    'appointmentType': {
      handler(value) {
        if (this.appointment.service_id) this.appointment.service_id = null;
        if (this.appointment.doctor_id) this.appointment.doctor_id = null;
        if (this.appointment.start_at) this.appointment.start_at = null;
        if (this.appointment.end_at) this.appointment.end_at = null;
      },
    },
    'appointment.specialty_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'specialty_id', value, oldValue });
      },
    },
    'appointment.group_service_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'group_service_id', value, oldValue });
      },
    },
    'appointment.doctor_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'doctor_id', value, oldValue });
      },
    },
    'appointment.service_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'service_id', value, oldValue });
      },
    },
  },

  methods: {
    async submitHandler() {
      if (this.loading.form) return;
      this.loading.form = true;

      try {
        this.data?.id ? await this.editAppointment() : await this.createAppointment();
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.form = false;
    },

    async createAppointment() {
      const { data } = await Appointment.create(this.appointment);

      this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessCreated') });
      this.$emit(
        'action',
        new GlobalDrawerAction({ name: 'created', data: { appointment: data.data } })
      );
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: data.data.id,
        },
      });
    },

    async editAppointment() {
      const { data } = await Appointment.update({
        id: this.appointment.id,
        payload: this.appointment,
      });

      this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });
      this.$emit(
        'action',
        new GlobalDrawerAction({ name: 'edited', data: { appointment: data.data } })
      );
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: data.data.id,
        },
      });
    },

    appointmentWatcherHandler({ field, value, oldValue }) {
      if (value === oldValue) return;

      switch (field) {
        case 'specialty_id': {
          if (this.appointment.doctor_id) this.appointment.doctor_id = null;
          break;
        }
        case 'group_service_id': {
          if (this.appointment.doctor_id) this.appointment.doctor_id = null;
          if (this.appointment.start_at) this.appointment.start_at = null;
          if (this.appointment.end_at) this.appointment.end_at = null;
          break;
        }
        case 'doctor_id': {
          // appointment.type === Service используется компонент которые сразу обновляет два поля doctor_id, service_id
          if (
            this.appointmentType !== this.appointmentTypesEnum.Service &&
            this.appointment.service_id
          ) {
            this.appointment.service_id = null;
          }

          if (this.appointment.start_at) this.appointment.start_at = null;
          if (this.appointment.end_at) this.appointment.end_at = null;
          break;
        }
        case 'service_id': {
          if (this.appointment.start_at) this.appointment.start_at = null;
          if (this.appointment.end_at) this.appointment.end_at = null;
          break;
        }
      }
    },

    openCreatePatientDrawer({ query }) {
      this.$refs.autocomplete_patient.blur();
      this.patientDrawer.show = true;
      this.$nextTick(() => (this.patientDrawer.nameOrPhone = query));
    },
    insertPatient(action) {
      if (action instanceof GlobalModalCloseAction) return;
      this.patientDrawer.show = false;

      this.patientDrawer.newPatient = action.data.patient;
      this.appointment.patient_id = action.data;
    },
  },

  // other
  setup: () => ({
    Patient: markRaw(Patient),
    Doctor: markRaw(Doctor),
    Service: markRaw(Service),
    ServiceGroup: markRaw(ServiceGroup),
    appointmentTypesEnum: markRaw(Appointment.enum.types),
    icons,
    DRAWER_DEFAULT_SIZE,
  }),
};
