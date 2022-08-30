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
      <ElButton
        v-if="data.status === Appointment.enum.statuses.Approved"
        type="primary"
        :loading="loading[Appointment.enum.statuses.Waiting]"
        @click="updateStatus(Appointment.enum.statuses.Waiting)">
        {{ $t('Base.CallToReception') }}
      </ElButton>
      <ElButton
        v-if="data.status === Appointment.enum.statuses.Approved"
        type="danger"
        plain
        :loading="loading[Appointment.enum.statuses.Canceled]"
        @click="updateStatus(Appointment.enum.statuses.Canceled)">
        {{ $t('Appointments.CancelReception') }}
      </ElButton>

      <ElButton
        v-if="data.status === Appointment.enum.statuses.Waiting"
        type="primary"
        :loading="loading[Appointment.enum.statuses.InProgress]"
        @click="updateStatus(Appointment.enum.statuses.InProgress)">
        {{ $t('Appointments.PatientCome') }}
      </ElButton>
      <ElButton
        v-if="data.status === Appointment.enum.statuses.Waiting"
        type="danger"
        plain
        :loading="loading[Appointment.enum.statuses.Canceled]"
        @click="updateStatus(Appointment.enum.statuses.Canceled)">
        {{ $t('Appointments.PatientNotCome') }}
      </ElButton>

      <ElButton
        v-if="data.status === Appointment.enum.statuses.InProgress"
        type="primary"
        :loading="loading[Appointment.enum.statuses.Provided]"
        @click="updateStatus(Appointment.enum.statuses.Provided)">
        {{ $t('Appointments.EndReception') }}
      </ElButton>

      <ElButton
        v-if="
          user.role === User.enum.roles.Manager &&
          data.status === Appointment.enum.statuses.Approved
        "
        type="primary"
        plain
        @click="editAppointment">
        {{ $t('Appointments.EditReception') }}
      </ElButton>
    </div>
  </ElCard>
</template>

<script>
import { mapState } from 'vuex';
import { insertRouteParams } from '@/utils/router.utils';
import { PATIENT_ROUTE } from '@/router/patients.routes';
import { DOCTORS_QUEUE_ROUTE } from '@/router/doctors.routes';
import { User } from '@/models/User.model';
import { Appointment } from '@/models/Appointment.model';
import { PriceService } from '@/services/price.service';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';

export default {
  name: 'AppointmentCard',
  components: { AppointmentStatusTag },
  props: {
    data: [Appointment, Object],
  },
  data() {
    return {
      loading: {
        [Appointment.enum.statuses.Waiting]: false,
        [Appointment.enum.statuses.Canceled]: false,
        [Appointment.enum.statuses.InProgress]: false,
        [Appointment.enum.statuses.Approved]: false,
        [Appointment.enum.statuses.Approved]: false,
      },
      hasLoadingState: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    patientPageLink() {
      return insertRouteParams({
        path: PATIENT_ROUTE.path,
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

    async updateStatus(status) {
      if (this.hasLoadingState) return;
      this.loading[status] = true;
      this.hasLoadingState = true;

      try {
        const { data } = await Appointment.updateStatus({
          id: this.data.id,
          status: status,
        });

        this.$emit('update:data', data.data);
        this.$notify({ type: 'success', title: this.$i18n.t('Notifications.SuccessUpdated') });

        if (
          status !== Appointment.enum.statuses.Waiting &&
          status !== Appointment.enum.statuses.InProgress &&
          this.user.role === User.enum.roles.Doctor
        ) {
          this.$router.push({
            name: DOCTORS_QUEUE_ROUTE.name,
          });
        }
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading[status] = false;
      this.hasLoadingState = false;
    },
  },

  setup: () => ({
    Appointment,
    User,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
