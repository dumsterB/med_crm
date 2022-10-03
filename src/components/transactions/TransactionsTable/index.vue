<template>
  <div class="transactions-table-wrapper">
    <ElScrollbar class="transactions-table-wrapper__scrollbar">
      <ElTable
        v-loading="loading"
        class="transactions-table"
        :data="items"
        :empty-text="$t('Base.NoData')"
        ref="elTable">
        <ElTableColumn prop="type" :label="$t('Base.Type')">
          <template #default="{ row }">
            <!--  Иначе выскакивают предупреждения из-зи row.type === undefined, хотя такого быть не может  -->
            {{ row.type ? $t(`Transactions.Types.${row.type}`) : '' }}
          </template>
        </ElTableColumn>

        <ElTableColumn prop="amount" :label="$t('Base.SumCost')" />
        <ElTableColumn prop="created_at" :label="$t('DateAndTime.CreatedAt')" />
      </ElTable>
    </ElScrollbar>

    <ElPagination
      class="transactions-table-wrapper__pagination"
      :current-page="page"
      :page-count="pageCount"
      :page-size="perPage"
      :page-sizes="PAGE_SIZES"
      :total="total"
      background
      hide-on-single-page
      layout="prev, pager, next, sizes"
      @update:current-page="$emit('update:page', $event)"
      @update:page-size="$emit('update:perPage', $event)" />
  </div>
</template>

<script>
import { PAGE_SIZES } from '@/config/ui.config';

export default {
  name: 'TransactionsTable',
  emits: ['update:perPage', 'update:page'],
  props: {
    items: Array,
    loading: Boolean,
    page: Number,
    perPage: Number,
    total: Number,
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.perPage);
    },
  },

  watch: {
    loading() {
      this.$refs.elTable.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

  setup: () => ({
    PAGE_SIZES,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/dateAndTime.locales.json" />
<i18n src="@/locales/transactions.locales.json" />
