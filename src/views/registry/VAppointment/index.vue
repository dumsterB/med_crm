<template>
  <LayoutRegistry content-class="v-patient-content">
    PatientRecord
    <ElButton type="primary" @click="editAppointment"> Edit </ElButton>
  </LayoutRegistry>
</template>

<script>
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';

export default {
  name: 'VAppointment',
  components: { LayoutRegistry },
  props: {
    id: [Number, String],
    patientId: [Number, String],
  },
  data() {
    return {
      loading: false,
      appointment: null,
    };
  },
  watch: {
    id: {
      handler() {
        this.getAppointment();
      },
      immediate: true,
    },
  },

  methods: {
    async getAppointment() {
      this.loading = true;

      const { data } = await Appointment.findOneById(this.id);
      this.appointment = data.data;

      this.loading = false;
    },

    async editAppointment() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          data: this.appointment,
        },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.appointment = action.data.appointment;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
