<template>
  <div class="queues-table-wrapper">
    <ElScrollbar class="queues-table-wrapper__scrollbar">
      <ElTable
        :row-class-name="tableRowClassName"
        class="queues-table"
        ref="elTable"
        :data="items"
        v-loading="loading">
        <template #empty>
          <div class="queues-table__empty queues-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
<!--            <ElButton type="primary">-->
<!--              {{ $t('Base.NoData') }}-->
<!--            </ElButton>-->
          </div>
        </template>
        <ElTableColumn prop="name" :label="$t('Base.FullName')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('User.Gender')">
          <template #default="{ row }">
            {{ $t(`User.Genders.${row.patient.gender}`) }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('User.Age')">
          <template #default="{ row }">
            {{ row.patient.age }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('User.Phone')">
          <template #default="{ row }">
            {{ row.patient.phone }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('Base.Time')">
          <template #default="{ row }">
            {{ row.start_at }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('Appointments.Statuses.Status')">
          <template #default="{ row }">
            <div class="queues-table-actions">
              <AppointmentStatusTag :status="row.status"></AppointmentStatusTag>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" width="200" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div v-if="row.status == status" class="queues-table-actions">
              <ElButton type="primary" @click="progressReception">{{
                $t('Base.CallToReception')
              }}</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import AppointmentStatusTag from '@/components/appointments/AppointmentStatusTag/index.vue';

export default {
  name: 'QueueTable',
  components: { AppointmentStatusTag },
  props: {
    /**
     * @param { Array<Queues|object> } items
     */
    items: Array,
    loading: Boolean,
  },
  icons: icons,
  computed: {},
  status: 'waiting',
  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  methods: {
    openQueue() {},
    progressReception() {},
    tableRowClassName(row, index) {
      return console.log(row, index);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
<i18n src="@/locales/appointments.locales.json" />
