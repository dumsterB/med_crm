<template>
  <ElCard class="appointment-card" shadow="never" v-bind="$attrs">
    <template #header>
      <router-link class="appointment-card__header appointment-card-header" :to="patientPageLink">
        <UiAvatar class="appointment-card-header__avatar" size="super-large" />

        <div class="appointment-card-header__user appointment-card-header-user">
          <div class="appointment-card-header-user__name">{{ data.patient?.name }}</div>
          <div class="appointment-card-header-user__phone">{{ data.patient?.phone }}</div>
        </div>

        <AppointmentStatusTag class="appointment-card-header__status" :status="data.status" />
      </router-link>
    </template>

    <div class="appointment-card-body">
      <div
        v-for="item in infoItems"
        :key="item.value"
        class="appointment-card-body__item appointment-card-body-item">
        <div class="appointment-card-body-item__title">{{ item.label }}:</div>
        <div class="appointment-card-body-item__value">{{ item.value }}</div>
      </div>
    </div>

    <ElDivider />

    <div class="appointment-card-actions">
      <ElButton type="primary" @click="editAppointment">
        {{ $t('Appointments.EditReception') }}
      </ElButton>
      <ElButton type="danger" @click="cancelAppointment" plain>
        {{ $t('Appointments.CancelReception') }}
      </ElButton>
    </div>
  </ElCard>
</template>

<script>
import { insertRouteParams } from '@/utils/router.utils';
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';
import { Appointment } from '@/models/Appointment.model';
import { PriceService } from '@/services/price.service';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import { DOCTORS_QUEUE_ROUTE } from '@/router/doctors.routes';

export default {
  name: 'AppointmentCard',
  components: { AppointmentStatusTag },
  props: {
    data: [Appointment, Object],
  },

  computed: {
    patientPageLink() {
      return insertRouteParams({
        path: REGISTRY_PATIENT_ROUTE.path,
        params: { id: this.data.patient_id },
      });
    },

    infoItems() {
      return [
        {
          label: this.$t('Appointments.StartDate'),
          value: Appointment.getStartDate(this.data.start_at || ''),
        },
        {
          label: this.$t('Appointments.StartTime'),
          value: Appointment.getStartTime(this.data.start_at || ''),
        },
        {
          label: this.$t('Base.Doctor'),
          value: this.data.doctor.name,
        },
        {
          label: this.$t('Base.Service'),
          value: this.data.service.title,
        },
        {
          label: this.$t('Base.Price'),
          value:
            PriceService.formatPrice({ price: this.data.service.price }) +
            ' ' +
            this.$t('Base.Sum'),
        },
      ];
    },
  },

  methods: {
    async editAppointment() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditAppointmentDrawer,
        payload: {
          data: this.data,
        },
      });

      if (action instanceof GlobalDrawerCloseAction) return;
      this.$emit('update:data', action.data.appointment);
    },
    async cancelAppointment() {
      try {
        await Appointment.updateStatus({
          id: this.data.id,
          status: Appointment.enum.statuses.Canceled,
        });

        this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });

        this.$router.push({
          name: DOCTORS_QUEUE_ROUTE.name,
        });
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
