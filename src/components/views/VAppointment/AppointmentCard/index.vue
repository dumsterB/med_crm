<template>
  <ElCard v-loading="loading" class="appointment-card" shadow="never" v-bind="$attrs">
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
      <ElButton
        type="primary"
        @click="updateStatus(Appointment.enum.statuses.InProgress)"
        v-if="
          data.status === Appointment.enum.statuses.Waiting ||
          data.status === Appointment.enum.statuses.Approved
        ">
        {{ $t('Appointments.PatientCome') }}
      </ElButton>
      <ElButton
        type="primary"
        @click="editAppointment"
        v-if="data.status === !Appointment.enum.statuses.Waiting">
        {{ $t('Appointments.EditReception') }}</ElButton
      >
      <!--   TODO: FIX   -->
      <ElButton
        type="danger"
        @click="updateStatus(Appointment.enum.statuses.Canceled)"
        plain
        v-if="cancelReception">
        {{ $t('Appointments.CancelReception') }}
      </ElButton>
      <ElButton
        type="danger"
        @click="updateStatus(Appointment.enum.statuses.Provided)"
        plain
        v-if="endReception">
        {{ $t('Appointments.EndReception') }}
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
  data() {
    return {
      loading: false,
    };
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
    endReception() {
      return (
        this.data.status === Appointment.enum.statuses.InProgress ||
        (this.data.status !== Appointment.enum.statuses.Provided &&
          this.data.status !== Appointment.enum.statuses.Waiting &&
          this.data.status !== Appointment.enum.statuses.Canceled &&
          this.data.status !== Appointment.enum.statuses.Approved)
      );
    },
    cancelReception() {
      return (
        this.data.status !== Appointment.enum.statuses.InProgress &&
        this.data.status !== Appointment.enum.statuses.Canceled &&
        this.data.status !== Appointment.enum.statuses.Provided
      );
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
    async updateStatus(status) {
      try {
        this.loading = true;
        const response = await Appointment.updateStatus({
          id: this.data.id,
          status: status,
        });

        this.data.status = response.data.data.status;

        this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });

        this.loading = false;
        if (
          status != Appointment.enum.statuses.Waiting &&
          status != Appointment.enum.statuses.InProgress
        ) {
          this.$router.push({
            name: DOCTORS_QUEUE_ROUTE.name,
          });
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    },
  },

  setup: () => ({
    Appointment,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
