<template>
  <div class="patients-search">
    <form class="patients-search__form" @submit.prevent="search">
      <ElInput v-model="queryWord">
        <template #append>
          <ElButton type="primary" native-type="submit" :loading="loading">
            {{ $t('Base.Search') }}
          </ElButton>
        </template>
      </ElInput>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { SEARCH } from '@/enums/icons.enum';
import { Patient } from '@/models/Patient.model';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  icons: {
    SEARCH,
  },
  data() {
    return {
      queryWord: null,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.patients.data,
      total: (state) => state.patients.total,
      loading: (state) => state.patients.loading,
    }),
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
        });
        this.setData({
          items: data.data,
          total: data.meta.total,
          overwriteDataState: true,
        });
      } catch (err) {
        console.log(err);
        this.$notify(err?.response?.data?.message || this.$t('Notifications.Error'));
      }

      this.setLoading(false);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
