<template>
  <div class="appointments-table-wrapper">
    <ElScrollbar class="appointments-table-wrapper__scrollbar">
      <ElTable
        v-loading="loading"
        class="appointments-table"
        :data="items"
        ref="elTable"
        @row-click="goToAppointment">
        <template #empty>
          <div class="appointments-table__empty appointments-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton type="primary" @click="addAppointment">
              {{ $t('Appointments.CreateAppointment') }}
            </ElButton>
          </div>
        </template>

        <ElTableColumn class-name="appointments-table__id" width="60" prop="id" label="ID" />

        <ElTableColumn width="150px" prop="start_at" :label="$t('DateAndTime.StartAt')">
          <template #default="{ row }">
            <AppointmentStartOrEndDate :date="row.start_at" />
          </template>
        </ElTableColumn>
        <ElTableColumn width="150px" prop="end_at" :label="$t('DateAndTime.EndAt')">
          <template #default="{ row }">
            <AppointmentStartOrEndDate :date="row.end_at" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="doctor.name" :label="$t('Appointments.Types.doctor')" />
        <ElTableColumn prop="patient.name" :label="$t('Base.Patient')" />
        <ElTableColumn prop="patient.phone" :label="$t('Appointments.PhonePatient')" />

        <ElTableColumn prop="status" :label="$t('Appointments.Statuses.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <!--        <ElTableColumn prop="appointment.resource" :label="$t('Appointments.RecordingSource')">
          {{ $t('Base.NoData') }}
        </ElTableColumn>-->

        <ElTableColumn prop="created_at" :label="$t('DateAndTime.CreatedAt')" />
      </ElTable>
    </ElScrollbar>

    <ElPagination
      class="appointments-table-wrapper__pagination"
      :current-page="page"
      :page-count="pageCount"
      :page-size="perPage"
      :page-sizes="pageSizes"
      :total="total"
      background
      hide-on-single-page
      layout="prev, pager, next, sizes"
      @update:current-page="$emit('update:page', $event)"
      @update:page-size="$emit('update:perPage', $event)" />
  </div>
</template>

<script>
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import { Appointment } from '@/models/Appointment.model';

import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import AppointmentStartOrEndDate from '@/components/appointments/AppointmentStartOrEndDate/index.vue';

export default {
  name: 'AppointmentsTable',
  components: { AppointmentStartOrEndDate, AppointmentStatusTag },
  emits: ['update:perPage', 'update:page'],
  props: {
    /** @property { Array<Appointment|object> } items */
    items: Array,
    loading: Boolean,
    page: Number,
    perPage: Number,
    total: Number,
    search: String,
  },
  icons: icons,

  computed: {
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
    pageSizes() {
      return PAGE_SIZES;
    },
  },
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

  methods: {
    goToAppointment(payload) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: { id: payload.id },
      });
    },
    addAppointment() {
      this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditAppointmentDrawer);
    },
  },
  setup: () => ({
    Appointment,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
