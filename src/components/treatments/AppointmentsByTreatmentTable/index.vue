<template>
  <div class="reception-table-wrapper">
    <ElScrollbar class="reception-table-wrapper__scrollbar">
      <ElTable
        class="reception-table"
        :data="data"
        v-loading="loading"
        ref="elTable"
        @row-click="goToReception">
        <template #empty>
          <div class="reception-table__empty reception-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
          </div>
        </template>

        <ElTableColumn prop="start_at" :label="$t('Appointments.StartDate')"></ElTableColumn>
        <ElTableColumn :label="$t('Base.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" width="200" :label="$t('Base.Actions')">
          <template #default>
            <div class="reception-table-actions">
              <ElButton type="primary"> {{ $t('Base.Open') }} </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
  </div>
</template>

<script>
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';
import { APPOINTMENT_ROUTE } from '@/router/appointments.routes';

export default {
  name: 'AppointmentsByTreatmentTable',
  components: {
    AppointmentStatusTag,
  },
  props: {
    data: {
      type: Array,
    },
    loading: Boolean,
  },
  methods: {
    goToReception(row) {
      this.$router.push({
        name: APPOINTMENT_ROUTE.name,
        params: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
