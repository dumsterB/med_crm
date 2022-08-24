<template>
  <div class="patient-appointment-table-wrapper">
    <ElScrollbar class="patient-appointment-table-wrapper__scrollbar">
      <ElTable
          class="patient-appointment-table"
          ref="elTable"
          :data="data"
          v-loading="loading">

        <template #empty>
          <div class="patient-appointment-table__empty patient-appointment-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
          </div>
        </template>
        <ElTableColumn prop="doctor.name" :label="$t('Base.FullName')"> </ElTableColumn>
        <ElTableColumn prop="service.title" :label="$t('Base.Service')"> </ElTableColumn>
        <ElTableColumn prop="service.category" :label="$t('Base.ReasonService')"> </ElTableColumn>
        <ElTableColumn prop="created_at" :label="$t('Appointments.StartDate')"> </ElTableColumn>
        <ElTableColumn prop="created_at" :label="$t('Appointments.StartDate')"> </ElTableColumn>
        <ElTableColumn :label="$t('Appointments.Statuses.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="name" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="patient-appointment-table-actions">
              <ElButton type="primary" @click.stop="editPatient">
                {{ $t('Base.OpenCard') }}
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
export default {
  name: 'QueueTable',
  components: { AppointmentStartOrEndDate, AppointmentStatusTag },
  props: {
    /**
     * @param { Object<Children|object> } data
     */
    data: Object,
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
    createAppointment(){},
    editPatient(){}
  },
  setup: () => ({
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
