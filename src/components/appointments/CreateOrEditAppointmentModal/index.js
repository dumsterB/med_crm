import { markRaw } from 'vue';
import { mapState } from 'vuex';
import * as icons from '@/enums/icons.enum.js';

import { APPOINTMENTS_ROUTE } from '@/router/appointments.routes';
import { DOCTORS_QUEUE_ROUTE } from '@/router/doctors.routes';
import { GlobalModalAction } from '@/models/client/ModalAndDrawer/GlobalModalAction';
import { Appointment } from '@/models/Appointment.model';
import { User } from '@/models/User.model';
import { Patient } from '@/models/Patient.model';
import { Doctor } from '@/models/Doctor.model';
import { Service } from '@/models/Service.model';
import { ServiceGroup } from '@/models/ServiceGroup.model';

import CreateOrEditPatient from '@/components/patients/CreateOrEditPatientModal/CreateOrEditPatient/index.vue';
import PatientsSearchSelectDataBlock from '@/components/patients/PatientsSearchSelectDataBlock/index.vue';
import CreateAppointmentSubject from './CreateAppointmentSubject/index.vue';
import AppointmentSubjectsTable from './AppointmentSubjectsTable/index.vue';
import CreateOrPayInvoiceModal from '@/components/invoices/CreateOrPayInvoiceModal/index.vue';

// TODO: написать документацию по бизнес логике
export default {
  name: 'CreateOrEditAppointmentModal',
  components: {
    CreateOrEditPatient,
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

      patientPart: {
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

    cost() {
      return this.appointment.appointments.reduce((acc, elem) => {
        const servicesCost = elem.group_services.reduce(
          (acc, groupService) => acc + groupService.price,
          0
        );

        return acc + servicesCost;
      }, 0);
    },
    discountedCost() {
      return this.appointment.discount > 0
        ? this.cost - this.cost * (this.appointment.discount / 100)
        : this.cost;
    },
  },

  watch: {
    modelValue: {
      handler() {
        this.appointment = new Appointment(this.data || { patient_id: this.patient?.id || null });
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
      if (!this.validate()) return;
      if (this.patientPart.show) await this.$refs.create_or_edit_patient.createPatient();

      const { data } = await Appointment.create(this.appointment);

      this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessCreated') });
      this.$emit(
        'action',
        new GlobalModalAction({
          name: 'created',
          data: { appointments: data.data.appointments, invoice: data.data.invoice },
        })
      );

      if (!this.disableDefaultAction) {
        this.$router.push(
          this.user.role === User.enum.roles.Doctor
            ? DOCTORS_QUEUE_ROUTE.path
            : APPOINTMENTS_ROUTE.path
        );

        if (this.user.role === User.enum.roles.Manager) {
          this.$store.dispatch('modalAndDrawer/openModal', {
            component: CreateOrPayInvoiceModal,
            payload: {
              data: data.data.invoice,
            },
          });
        }
      }
    },

    async editAppointment() {
      // const { data } = await Appointment.update({
      //   id: this.appointment.id,
      //   payload: this.appointment,
      // });
      //
      // this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });
      // this.$emit(
      //   'action',
      //   new GlobalModalAction({ name: 'edited', data: { appointments: data.data } })
      // );
      //
      // if (!this.disableDefaultAction) {
      // }
    },

    /**
     * Доролнительная проверка
     * @return {boolean} если успешно true
     */
    validate() {
      if (this.patientPart.show) {
        const isValidatePatient = this.$refs.create_or_edit_patient.customValidate();
        if (!isValidatePatient) return false;
      }

      if (!this.appointment.appointments.length) {
        this.$notify({
          type: 'error',
          title: this.$t('NotAppointmentsError'),
        });
        return false;
      }

      return true;
    },

    /** @param {AppointmentSubject} subject */
    addSubject(subject) {
      this.appointment.appointments.push(subject);
    },

    /** @param {AppointmentSubject} subject */
    removeSubject(subject) {
      this.appointment.appointments = this.appointment.appointments.filter(
        (elem) => elem._id !== subject._id
      );
    },

    startCreatePatientFlow(query) {
      this.$refs.autocomplete_patient.blur();
      this.patientPart.show = true;
      this.$nextTick(() => (this.patientPart.nameOrPhone = query));
    },
    insertPatient(action) {
      this.appointment.patient = action.data.patient;
      this.appointment.patient_id = action.data.patient.id;
      this.patientPart.show = false;
      this.patientPart.nameOrPhone = null;
      this.patientPart.newPatient = action.data.patient;
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
