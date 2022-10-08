import { markRaw } from 'vue';
import { mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';

import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';
import { Appointment } from '@/models/Appointment.model';
import { User } from '@/models/User.model';
import { Patient } from '@/models/Patient.model';
import { Doctor } from '@/models/Doctor.model';
import { Service } from '@/models/Service.model';
import { ServiceGroup } from '@/models/ServiceGroup.model';

import CreateOrEditPatientModal from '@/components/patients/CreateOrEditPatientModal/index.vue';
import PatientsSearchSelectDataBlock from '@/components/patients/PatientsSearchSelectDataBlock/index.vue';
import CreateAppointmentSubject from './CreateAppointmentSubject/index.vue';
import AppointmentSubjectsTable from './AppointmentSubjectsTable/index.vue';

// TODO: написать документацию по бизнес логике
export default {
  name: 'CreateOrEditAppointmentModal',
  components: {
    CreateOrEditPatientModal,
    PatientsSearchSelectDataBlock,
    CreateAppointmentSubject,
    AppointmentSubjectsTable,
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
      loading: {
        form: false,
      },

      patientModal: {
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
    patientsOptions() {
      return {
        searchQuery: {
          query_field: ['name', 'phone'],
        },
      };
    },
  },

  watch: {
    modelValue: {
      handler() {
        this.appointment = new Appointment(
          this.data || { patient_id: this.patient?.id || null, doctor_id: this.user.doctor_id }
        );
      },
      immediate: true,
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
        new GlobalModalAction({ name: 'created', data: { appointment: data.data } })
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
        new GlobalModalAction({ name: 'edited', data: { appointment: data.data } })
      );

      if (!this.disableDefaultAction) this.goToAppointment(data.data.id);
    },

    /** @param {AppointmentSubject} subject */
    addSubject(subject) {
      this.appointment.subjects.push(subject);
    },

    /** @param {AppointmentSubject} subject */
    removeSubject(subject) {
      this.appointment.subjects = this.appointment.subjects.filter(
        (elem) => elem._id !== subject._id
      );
    },

    openCreatePatientModal(query) {
      this.patientModal.show = true;
      this.$nextTick(() => (this.patientModal.nameOrPhone = query));
    },
    insertPatient(action) {
      if (action instanceof GlobalModalCloseAction) return;
      this.patientModal.show = false;

      this.patientModal.newPatient = action.data.patient;
      this.appointment.patient_id = action.data.patient.id;
    },

    goToAppointment(id) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: id,
        },
      });
    },
  },

  // other
  setup: () => ({
    Patient: markRaw(Patient),
    Doctor: markRaw(Doctor),
    Service: markRaw(Service),
    ServiceGroup: markRaw(ServiceGroup),
    icons,
  }),
};
