<template>
  <div class="queues-table-wrapper">
    <ElScrollbar class="queues-table-wrapper__scrollbar">
      <ElTable class="queues-table" ref="elTable" :data="items" v-loading="loading">
        <template #empty>
          <div class="queues-table__empty queues-table-empty">
            <span>{{ $t('Base.NoData') }}</span>
            <ElButton type="primary">
              {{ $t('Base.NoData') }}
            </ElButton>
          </div>
        </template>
        <ElTableColumn prop="name" :label="$t('Base.FullName')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('User.Gender')">
          <template #default="{ row }">
            {{ row.patient.gender }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('User.Age')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('User.Phone')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('User.Phone')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="$t('Base.Time')">
          <template #default="{ row }">
            {{ row.patient.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" width="320" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="queues-table-actions">
              <ElButton>{{ $t('progressReception') }}</ElButton>
              <ElButton type="primary">{{ $t('Base.Edit') }}</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
    <!--    <ElPagination-->
    <!--      class="patients-table-wrapper__pagination"-->
    <!--      :current-page="page"-->
    <!--      :page-count="pageCount"-->
    <!--      :page-size="perPage"-->
    <!--      :page-sizes="pageSizes"-->
    <!--      :total="total"-->
    <!--      background-->
    <!--      hide-on-single-page-->
    <!--      layout="prev, pager, next, sizes"-->
    <!--      @update:current-page="$emit('update:page', $event)"-->
    <!--      @update:page-size="$emit('update:perPage', $event)" />-->
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'QueueTable',
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

  methods: {},
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/user.locales.json" />
<i18n src="@/locales/patients.locales.json" />
