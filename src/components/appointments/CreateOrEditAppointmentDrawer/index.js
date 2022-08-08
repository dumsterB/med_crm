import { markRaw } from 'vue';
import { GlobalDrawerAction } from '@/models/client/ModalAndDrawer/GlobalDrawerAction';
import { Appointment } from '@/models/Appointment.model';
import { User } from '@/models/User.model';
import { Patient } from '@/models/Patient.model';
import { Doctor } from '@/models/Doctor.model';
import { Service } from '@/models/Service.model';
import { ServiceGroup } from '@/models/ServiceGroup';

import SpecialtiesSelect from '@/components/specialties/SpecialtiesSelect/index.vue';
import ScheduleSlotsSelect from '@/components/appointments/ScheduleSlotsSelect/index.vue';

export default {
  name: 'CreateOrEditAppointmentDrawer',
  components: { SpecialtiesSelect, ScheduleSlotsSelect },
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
      loading: {
        form: false,
      },
    };
  },
  computed: {
    appointmentFields() {
      return Object.keys(this.appointment);
    },
    appointmentFieldsFlexOrder() {
      return {
        patient: 1,
        type: 2,
        specialty: 3,
        doctor: this.appointmentType === this.appointmentTypesEnum.Doctor ? 4 : 5,
        service: this.appointmentType !== this.appointmentTypesEnum.Doctor ? 4 : 5,
        date: 6,
        actions: 7,
      };
    },

    specialtiesIsDisabled() {
      return !this.appointment.patient_id;
    },

    doctorsIsDisabled() {
      return this.appointmentType === this.appointmentTypesEnum.Doctor
        ? !this.appointment.specialty_id
        : !this.appointment.service_id;
    },
    doctorsSearchQuery() {
      return {
        specialties_id: [this.appointment.specialty_id],
        query_field: ['name'],
      };
    },

    servicesModelForUse() {
      return this.appointmentType === this.appointmentTypesEnum.Doctor ? Service : ServiceGroup;
    },
    servicesIsDisabled() {
      return this.appointmentType === this.appointmentTypesEnum.Doctor
        ? !this.appointment.doctor_id
        : !this.appointment.patient_id;
    },
    servicesSearchQuery() {
      return {
        doctorId: this.appointment.doctor_id,
        query_field: null,
        query_type: null,
        query_operator: null,
      };
    },

    slotsIsDisabled() {
      return this.appointmentType === this.appointmentTypesEnum.Doctor
        ? !this.appointment.service_id
        : !this.appointment.doctor_id;
    },
  },

  watch: {
    'modelValue': {
      handler() {
        this.appointment = new Appointment({ patient_id: this.patient.id });
      },
      immediate: true,
      deep: true,
    },

    'appointmentType': {
      handler(value) {
        if (this.appointment.service_id) this.appointment.service_id = null;
        if (this.appointment.doctor_id) this.appointment.doctor_id = null;
        if (this.appointment.start_at) this.appointment.type.start_at = null;
        if (this.appointment.end_at) this.appointment.end_at = null;

        if (value === this.appointmentTypesEnum.Service) this.getGroupsService();
      },
    },
    'appointment.specialty_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'specialty_id', value, oldValue });
      },
      immediate: true,
    },
    'appointment.doctor_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'doctor_id', value, oldValue });
      },
      immediate: true,
    },
    'appointment.service_id': {
      handler(value, oldValue) {
        this.appointmentWatcherHandler({ field: 'service_id', value, oldValue });
      },
    },
  },

  methods: {
    async createAppointment() {
      if (this.loading.form) return;
      this.loading.form = true;

      try {
        const { data } = await Appointment.create(this.appointment);

        this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessCreated') });
        this.$emit(
          'action',
          new GlobalDrawerAction({ name: 'created', data: { appointment: data.data } })
        );
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading.form = false;
    },

    appointmentWatcherHandler({ field, value, oldValue }) {
      if (value === oldValue) return;

      switch (field) {
        case 'specialty_id': {
          if (this.appointment.doctor_id) this.appointment.doctor_id = null;
          break;
        }
        case 'doctor_id': {
          if (this.appointment.service_id) this.appointment.service_id = null;
          break;
        }
        case 'service_id': {
          if (this.appointment.start_at) this.appointment.type.start_at = null;
          if (this.appointment.end_at) this.appointment.end_at = null;
          break;
        }
      }
    },

    async getGroupsService() {},

    checkPayload(payload) {
      console.log(payload);
    },
  },

  // other
  setup: () => ({
    Patient: markRaw(Patient),
    Doctor: markRaw(Doctor),
    Service: markRaw(Service),
    ServiceGroup: markRaw(ServiceGroup),
    appointmentTypesEnum: markRaw(Appointment.enum.types),
  }),
};
