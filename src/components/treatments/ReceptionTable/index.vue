<template>
  <div class="reception-card-wrapper">
    <ElScrollbar class="treatments-table-wrapper__scrollbar">
      <ElTable
        class="treatments-table"
        :data="data"
        v-loading="loading"
        ref="elTable"
        @row-click="goToReception">
        <template #empty>
          <div class="treatments-table__empty treatments-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton v-if="!isDoctor" type="primary">
              {{ $t('Patients.AddPatient') }}
            </ElButton>
          </div>
        </template>

        <ElTableColumn prop="start_at" :label="$t('Base.DoctorFullName')"></ElTableColumn>
        <ElTableColumn :label="$t('Base.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" width="200" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="treatments-table-actions">
              <ElButton type="primary" @click="goToReception">
                {{ $t('Base.EndTreatment') }}
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    data: {
      type: Array,
    },
    loading: Boolean,
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
