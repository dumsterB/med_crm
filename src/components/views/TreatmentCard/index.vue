<template>
  <div class="treatment-card-wrapper">
    <ElScrollbar class="treatments-table-wrapper__scrollbar">
      <ElTable
          class="treatments-table"
          :data="data"
          v-loading="loading"
          ref="elTable"
          @row-click="goToPatient">
        <template #empty>
          <div class="treatments-table__empty treatments-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
          </div>
        </template>

        <ElTableColumn prop="doctor.name" :label="$t('Base.DoctorFullName')"></ElTableColumn>
        <ElTableColumn prop="title" :label="$t('Base.Naming')"></ElTableColumn>
        <ElTableColumn prop="price" :label="$t('Base.Price')">
          <template #default="{ row }"> {{ row?.price }} {{ $t('Base.Sum') }} </template>
        </ElTableColumn>
        <ElTableColumn prop="created_at" :label="$t('Base.DateAppoint')"></ElTableColumn>
        <ElTableColumn prop="duration" :label="$t('Base.ColDays')"></ElTableColumn>
        <ElTableColumn :label="$t('Base.Status')">
          <template #default="{ row }">
            <AppointmentStatusTag :status="row?.status" />
          </template>
        </ElTableColumn>

        <ElTableColumn prop="actions" width="200" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="treatments-table-actions">
              <ElButton type="primary" @click="goToPatient">
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
import AppointmentStatusTag from "@/components/appointments/AppointmentStatusTag/index.vue";
export default {
  name: 'index',
  components: {
    AppointmentStatusTag
  },

  props: {
    data: [Array],
    loading: Boolean,
  },
  methods:{
    goToPatient(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
