<template>
  <div class="queues-table-wrapper">
    <ElScrollbar class="queues-table-wrapper__scrollbar">
      <ElTable
        class="queues-table"
        v-loading="loading"
        :data="items"
        :empty-text="$t('Base.NoData')"
        ref="elTable"
        @row-click="goToAppointment">
        <ElTableColumn prop="patient.name" :label="$t('Base.FullName')"></ElTableColumn>
        <ElTableColumn prop="patient.gender" :label="$t('User.Gender')">
          <template #default="{ row }">
            {{ $t(`User.Genders.${row.patient.gender}`) }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="patient.age" :label="$t('User.Age')"></ElTableColumn>
        <ElTableColumn prop="patient.phone" :label="$t('User.Phone')"></ElTableColumn>
        <ElTableColumn prop="start_at" :label="$t('Base.Time')">
          <template #default="{ row }">
            <AppointmentStartOrEndDate :date="row.start_at" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="status" :label="$t('Appointments.Statuses.Status')">
          <template #default="{ row }">
            <div class="queues-table-actions">
              <AppointmentStatusTag :status="row.status"></AppointmentStatusTag>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" width="200" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="queues-table-actions">
              <ElButton
                v-if="row.status === Appointment.enum.statuses.Approved"
                type="primary"
                @click="callToReception(row)">
                {{ $t('Base.CallToReception') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
  </div>
</template>

<script>
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import AppointmentStartOrEndDate from '@/components/appointments/AppointmentStartOrEndDate/index.vue';
import * as icons from '@/enums/icons.enum.js';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import { Appointment } from '@/models/Appointment.model';

export default {
  name: 'QueueTable',
  components: { AppointmentStartOrEndDate, AppointmentStatusTag },
  props: {
    /**
     * @param { Array<Queues|object> } items
     */
    items: Array,
    loading: Boolean,
  },
  icons: icons,
  computed: {},
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  methods: {
    async callToReception(payload) {
      try {
        await Appointment.updateStatus({
          id: payload.id,
          status: Appointment.enum.statuses.Waiting,
        });

        this.$notify({ type: 'success', title: this.$it('Notifications.SuccessUpdated') });
        this.$router.push({
          name: APPOINTMENT_ROUTE.name,
          params: { id: payload.id },
        });
      } catch (error) {
        console.log(error);
        this.$notify({
          type: 'success',
          title: error?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }
    },

    goToAppointment(payload) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: { id: payload.id },
      });
    },
  },
  setup: () => ({
    Appointment,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
