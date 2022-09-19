<template>
  <LayoutRegistry
    :loading="loading.profile || loading.appointment"
    content-class="v-patient-content">
    <ElButton type="primary" @click="tcpHandler"> TCP </ElButton>
    <ElButton type="primary" plain @click="tcpHandlerWindow">Window</ElButton>
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
import axios from 'axios';
import * as icons from '@/enums/icons.enum.js';
import { Patient } from '@/models/Patient.model';
import { Appointment } from '@/models/Appointment.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import LayoutRegistry from '@/components/layouts/LayoutRegistry/index.vue';
import CreateOrEditPatientDrawer from '@/components/patients/CreateOrEditPatientDrawer/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import { ApiService } from '@/services/api.service';

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

    async tcpHandler() {
      const blob = new TextEncoder().encode(
        'SIZE 150 mm, 100.1 mm' +
          '\n' +
          'GAP 3 mm, 0 mm' +
          '\n' +
          'CLS' +
          '\n' +
          'QRCODE 10,10,H,10,A,0,"https://zordoc.uz"' +
          '\n' +
          `TEXT 200, 200, "1", 0, 2, 2, "\["]DEMO FOR TEXT\["]"` +
          '\n' +
          'PRINT 1,1' +
          '\n'
      );

      const data = await fetch(`http://192.168.0.101:9100`, {
        method: 'POST',
        body: blob,
      });
    },

    async tcpHandlerWindow() {
      const _window = await window.open(
        'http://test-printer.zordoc.uz/',
        'printer',
        'width=500,height=500'
      );
      // console.log(_window);
      // _window.addEventListener('message', (message) => {
      //   console.log('__window');
      // });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
