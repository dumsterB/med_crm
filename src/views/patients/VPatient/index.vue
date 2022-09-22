<template>
  <LayoutByUserRole
    :loading="loading.profile || loading.appointment || loading.treatments"
    content-class="v-patient-content">
    <RouterView
      v-if="patient"
      v-model:patient="patient"
      :appointments="appointments"
      :treatments="treatments"
      :loading="loading"
      @appointment:create="createAppointment"
      @treatment:create="createTreatment"
      @treatment:updated="updateTreatment"
      @patient:createChildren="createChildren">
    </RouterView>
  </LayoutByUserRole>
</template>

<script>
import { mapState } from 'vuex';
import { Patient } from '@/models/Patient.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';
import { Treatment } from '@/models/Treatment.model';

import LayoutByUserRole from '@/components/layouts/LayoutByUserRole/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import CreateTreatmentModal from '@/components/treatments/CreateTreatmentModal/index.vue';

export default {
  name: 'VPatient',
  components: { LayoutByUserRole },
  props: {
    id: [Number, String],
  },
  data() {
    return {
      /** @type Array<Appointment> */
      appointments: [],
      /** @type Patient */
      patient: null,
      loading: {
        profile: false,
        appointment: false,
        treatments: false,
      },
    };
  },
  computed: {
    ...mapState({
      treatments: (state) => state.treatments.data,
      user: (state) => state.auth.user,
    }),

    isChildren() {
      return !!this.patient.parent_id;
    },
  },
  watch: {
    id: {
      async handler() {
        await this.getUser();
        this.getAppointments();
        this.getTreatmentByUserId();
      },
      immediate: true,
    },
  },

  methods: {
    async getUser() {
      this.loading.profile = true;

      const { data } = await Patient.findOneById(this.id);
      this.patient = data.data;

      this.loading.profile = false;
    },

    async getAppointments() {
      this.loading.appointment = true;

      const { data } = await Appointment.find({
        query_type: 'EQUALS',
        search: this.patient.id,
        query_field: 'user_id',
        page: 1,
        per_page: 100,
      });
      this.appointments = data.data;

      this.loading.appointment = false;
    },

    async getTreatmentByUserId() {
      this.loading.treatments = true;

      const { data } = await Treatment.findByUserId(this.id);

      this.$store.dispatch('treatments/setData', { items: data.data, overwriteDataState: true });
      this.loading.treatments = false;
    },

    createAppointment() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          patient: this.patient,
        },
      });
    },

    async createTreatment() {
      const action = await this.$store.dispatch('modalAndDrawer/openModal', {
        component: CreateTreatmentModal,
        payload: {
          userId: this.patient.id,
        },
      });

      if (action instanceof GlobalModalCloseAction) return;
      this.$store.dispatch('treatments/createItem', action.data.treatment);
    },

    updateTreatment(treatment) {
      this.$store.dispatch('treatments/editItem', treatment);
    },

    async editPatient() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: { data: this.patient },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.patient = action.data.patient;
    },

    createChildren() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditPatientDrawer,
        payload: {
          data: new Patient({ parent: this.patient, parent_id: this.patient.id }),
        },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
