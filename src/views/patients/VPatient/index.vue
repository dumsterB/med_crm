<template>
  <LayoutRegistry
    :loading="loading.profile || loading.appointment"
    content-class="v-patient-content">
    <RouterView
      v-if="patient"
      v-model:patient="patient"
      :appointments="appointments"
      :loading="loading"
      @appointment:create="createAppointment"
      @patient:createChildren="createChildren">
    </RouterView>
  </LayoutRegistry>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Patient } from '@/models/Patient.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';

export default {
  name: 'VPatient',
  components: {
    LayoutRegistry,
  },
  icons: icons,
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
      },
    };
  },
  computed: {
    isChildren() {
      return !!this.patient.parent_id;
    },
  },
  watch: {
    id: {
      async handler() {
        await this.getUser();
        this.getAppointments();
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
    createAppointment() {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          patient: this.patient,
        },
      });
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
