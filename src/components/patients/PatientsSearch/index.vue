<template>
  <div class="patients-search">
    <form class="patients-search__form" @submit.prevent="throttleSearch">
      <ElInput v-model.trim="queryWord">
        <template #append>
          <ElButton type="primary" native-type="submit" :loading="loading">
            {{ $t('Base.Search') }}
          </ElButton>
        </template>
      </ElInput>
    </form>

    <PatientsSearchPopover
      v-show="isOpenPopover"
      class="patients-search__popover"
      :search="queryWord"
      :patients="items"
      :loading="loading" />
  </div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { mapState, mapActions } from 'vuex';
import { throttle } from 'lodash';
import { useQuery } from '@/hooks/useQuery.hook';
import * as QueryEnums from '@/enums/query.enum.js';
import { SEARCH } from '@/enums/icons.enum';
import { Patient } from '@/models/Patient.model';

import PatientsSearchPopover from './PatientsSearchPopover/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { PatientsSearchPopover },
  icons: { SEARCH },

  setup: () => ({
    queryWord: useQuery(QueryEnums.SEARCH),
  }),
  data() {
    return {
      isOpenPopover: false,
      throttleSearch: null, // void
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.patients.data,
      total: (state) => state.patients.total,
      loading: (state) => state.patients.loading,
    }),
  },
  watch: {
    queryWord(value) {
      if (value && value.length) this.throttleSearch();
      if (value && !this.isOpenPopover) this.isOpenPopover = true;
      if ((!value || !value.length) && this.isOpenPopover) this.isOpenPopover = false;
    },
  },

  methods: {
    ...mapActions({
      setLoading: 'patients/setLoading',
      setData: 'patients/setData',
    }),

    async search() {
      if (this.loading) return;
      this.setLoading(true);

      try {
        const { data } = await Patient.find({
          page: 1,
          per_page: 100,
          search: this.queryWord,
          query_field: ['name', 'phone'],
          query_type: 'ILIKE',
          order_operator: 'or',
        });
        this.setData({
          items: data.data,
          total: data.meta.total,
          overwriteDataState: true,
        });

        this.isOpenPopover = true;
      } catch (err) {
        console.log(err);
        this.$notify(err?.response?.data?.message || this.$t('Notifications.Error'));
      }

      this.setLoading(false);
    },
  },
  mounted() {
    console.log(this.queryWord);
    this.throttleSearch = throttle(this.search, 350);
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
