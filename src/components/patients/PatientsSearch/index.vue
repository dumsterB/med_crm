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
import { mapState, mapActions } from 'vuex';
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { SEARCH } from '@/enums/icons.enum';
import * as QueryEnum from '@/enums/query.enum';
import { Patient } from '@/models/Patient.model';
import PatientsSearchPopover from './PatientsSearchPopover/index.vue';
import { throttle } from 'lodash';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { PatientsSearchPopover },
  icons: {
    SEARCH,
  },
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

    queryWord: {
      get() {
        return this.$route.query[QueryEnum.SEARCH];
      },
      set(value) {
        if (!value || !value.length) {
          const query = { ...this.$route.query };
          delete query[QueryEnum.SEARCH];

          this.$router.replace({ ...this.$route, query: query });
        }

        if (value) {
          this.$router.replace({
            ...this.$route,
            query: { ...this.$route.query, [QueryEnum.SEARCH]: value },
          });
        }
      },
    },
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
          query_field: ['name'],
          query_type: 'ILIKE',
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
    this.throttleSearch = throttle(this.search, 350);
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
