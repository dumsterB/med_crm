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
import { PriceService } from '@/services/price.service';

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

    disableDefaultAction: Boolean, // отключаем дефолтное поведение после создания
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
      isLiveQueue: true,

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
        dateType: 7,
        date: 8,
        actions: 9,
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
        isRequired: false,
      };
    },

    groupServicesOptions() {
      return {
        isShow: this.appointmentType === this.appointmentTypesEnum.Service,
        isDisabled:
          this.appointmentType === this.appointmentTypesEnum.Service
            ? !this.appointment.patient_id
            : true,
        isRequired: this.appointmentType === this.appointmentTypesEnum.Service,
        searchQuery: {
          query_field: null,
          query_type: null,
          query_operator: null,
          some_services: true,
        },
      };
    },
    // если выбрано больше одной группы услуг, компонент DoctorsSelectByGroupService скрывается
    currentGroupService() {
      return this.appointment.group_service_ids.length
        ? this.groupServices.find((elem) => elem.id === this.appointment.group_service_ids[0])
        : null;
    },

    doctorsAndServicesOptions() {
      return {
        isShow:
          this.appointmentType === this.appointmentTypesEnum.Service &&
          this.appointment.group_service_ids.length < 2,
        // isRequired: this.appointmentType === this.appointmentTypesEnum.Service,
        isRequired: false,
      };
    },

    doctorsOptions() {
      return {
        isShow: this.appointmentType === this.appointmentTypesEnum.Doctor,
        isDisabled:
          this.appointmentType === this.appointmentTypesEnum.Doctor
            ? !this.appointment.patient_id
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

    dateTypeOptions() {
      return {
        isShow:
          !this.data?.id &&
          this.appointment.service_ids.length < 2 &&
          this.appointment.group_service_ids.length < 2,
      };
    },

    slotsOptions() {
      return {
        isShow:
          !this.isLiveQueue &&
          this.appointment.service_ids.length < 2 &&
          this.appointment.group_service_ids.length < 2,
        isDisabled:
          this.appointmentType === this.appointmentTypesEnum.Doctor
            ? !this.appointment.service_ids.length
            : !this.appointment.group_service_id,
        // при изменении этих значений сбрасывается start_at, end_at
        dependencies: {
          type: this.appointmentType,
          groupServiceIds: this.appointment.group_service_ids,
          serviceIds: this.appointment.service_ids,
          doctorId: this.appointment.doctor_id,
          isLiveQueue: this.isLiveQueue,
        },
      };
    },
  },

  watch: {
    'modelValue': {
      handler() {
        this.appointment = new Appointment(
          this.data || { patient_id: this.patient?.id || null, doctor_id: this.user.doctor_id }
        );
      },
      immediate: true,
      deep: true,
    },

    'appointmentType': {
      handler(value) {
        if (this.appointment.service_ids.length) this.appointment.service_ids = [];
        if (this.appointment.doctor_id) this.appointment.doctor_id = this.user.doctor_id || null;
      },
    },
    'appointment.specialty_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'specialty_id', value, oldValue });
      },
    },
    'appointment.group_service_ids': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'group_service_ids', value, oldValue });
      },
      deep: true,
    },
    'appointment.doctor_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'doctor_id', value, oldValue });
      },
    },
    'appointment.service_ids': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'service_ids', value, oldValue });
      },
      deep: true,
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
      if (!this.disableDefaultAction) this.goToAppointment(data.data.id);
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

      if (!this.disableDefaultAction) this.goToAppointment(data.data.id);
    },

    appointmentWatcherHandler({ field, value, oldValue }) {
      if (value === oldValue) return;

      switch (field) {
        case 'specialty_id': {
          if (this.appointment.doctor_id) this.appointment.doctor_id = null;
          break;
        }
        case 'group_service_ids': {
          if (this.appointment.doctor_id) this.appointment.doctor_id = null;
          break;
        }
        case 'doctor_id': {
          // appointment.type === Service используется компонент который сразу обновляет два поля doctor_id, service_id
          if (
            this.appointmentType !== this.appointmentTypesEnum.Service &&
            this.appointment.service_ids.length
          ) {
            this.appointment.service_ids = [];
          }
          break;
        }
        case 'service_id': {
          break;
        }
      }
    },

    openCreatePatientDrawer(query) {
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

    goToAppointment(id) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: id,
        },
      });
    },

    /** @param {Service|ServiceGroup|object} service */
    generateServiceOptionLabel(service) {
      const title = service.title;
      const price =
        service.price ?? service.services?.reduce((acc, service) => acc + (service.price || 0), 0);

      return `${title} - ${PriceService.formatPrice({ price: price })} ${this.$t('Base.Sum')}`;
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
