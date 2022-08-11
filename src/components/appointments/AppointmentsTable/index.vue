<template>
  <div class="appointments-table-wrapper">
    <ElScrollbar class="appointments-table-wrapper__scrollbar">
      <ElTable
        v-loading="loading"
        class="appointments-table"
        :data="itemsWithPayload"
        ref="elTable"
        @row-click="goToAppointment">
        <template #empty>
          <div class="appointments-table__empty appointments-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton type="primary" @click="addAppointment">
              {{ $t('Patients.AddPatient') }}
            </ElButton>
          </div>
        </template>

        <ElTableColumn class-name="appointments-table__id" width="60" prop="id" label="ID" />
        <ElTableColumn prop="start_at" :label="$t('DateAndTime.StartAt')" />
        <ElTableColumn prop="end_at" :label="$t('DateAndTime.EndAt')" />
        <ElTableColumn prop="doctor.name" :label="$t('Appointments.Types.doctor')" />
        <ElTableColumn prop="patient.name" :label="$t('Base.Patient')" />
        <ElTableColumn prop="patient.phone" :label="$t('Appointments.PhonePatient')" />

        <ElTableColumn width="120" prop="status" :label="$t('Appointments.Statuses.Status')">
          <template #default="{ row }">
            <ElTag :type="row.statusTag.type" effect="dark" round>
              {{ row.statusTag.label }}
            </ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="patient.phone" :label="$t('Appointments.RecordingSource')" />
        <ElTableColumn prop="clinic.published_at" :label="$t('DateAndTime.CreatedAt')" />
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
import { REGISTRY_PATIENT_RECORD_ROUTE } from '@/router/registry.routes';
import * as icons from '@/enums/icons.enum.js';
import { PAGE_SIZES } from '@/config/ui.config';
import { Appointment } from '@/models/Appointment.model';

import CreateOrEditAppointmentDrawer from '@/components/appointments/CreateOrEditAppointmentDrawer/index.vue';

export default {
  name: 'AppointmentsTable',
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
    itemsWithPayload() {
      return this.items.map((appointment) => {
        let statusTagType = 'success';
        if (appointment.status === Appointment.enum.statuses.Canceled) statusTagType = 'danger';
        if (appointment.status === Appointment.enum.statuses.Provided) statusTagType = 'warning';

        let statusTagIcon = icons.DOUBLE_CHECKER;
        if (appointment.status === Appointment.enum.statuses.Canceled)
          statusTagIcon = icons.CANCELED_ROUND;
        if (appointment.status === Appointment.enum.statuses.Provided)
          statusTagIcon = icons.PROVIDED;

        return {
          ...appointment,
          statusTag: {
            label: this.$t(`Appointments.Statuses.${appointment.status}`),
            type: statusTagType,
            icon: statusTagIcon,
          },
        };
      });
    },

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
        name: REGISTRY_PATIENT_RECORD_ROUTE.name,
        params: { patientId: payload.patient_id, id: payload.id },
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