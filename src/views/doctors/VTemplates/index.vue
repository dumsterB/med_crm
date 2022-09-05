<template>
  <LayoutDoctor>
    <LayoutContentHeader>
      <template #actions>
        <ElButton type="primary" @click="createTemplate"
        >+ {{ $t('Templates.AddTemplate') }}</ElButton>
      </template>
    </LayoutContentHeader>
    <TemplatesTable :data="data" :loading="loading"></TemplatesTable>
  </LayoutDoctor>
</template>

<script>
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';
import CreateOrEditTemplates from '@/components/doctors/CreateOrEditTemplateDrawer/index.vue';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model.js';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { usePage, usePerPage } from '@/hooks/query';
import TemplatesTable from '@/components/doctors/TemplatesTable/index.vue';
import { mapState } from 'vuex';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';
import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';

export default {
  name: 'VTemplates',
  components: { LayoutContentHeader, LayoutDoctor, CreateOrEditTemplates, TemplatesTable },

  setup: () => ({
    perPage: usePerPage(99),
    page: usePage(),
  }),

  data() {
    return {
      loading: false,
    };
  },

  watch: {
    queryWatchers: {
      handler(value, oldValue) {
        compareQueriesThenLoadData({
          query: value,
          oldQuery: oldValue,
          getData: this.getTemplates,
        });
      },
      immediate: true,
      deep: true,
    },
  },

  computed: {
    ...mapState({
      data: (state) => state.templates.data,
    }),

    queryWatchers() {
      return {
        query: this.query.value,
        oldQuery: this.oldQuery.value,
      };
    },
  },

  methods: {
    async getTemplates() {
      this.loading = true;

      try {
        const { data } = await InspectionCardTemplate.find({
          per_page: this.perPage.value,
          page: this.page.value,
        });
        this.$store.dispatch('templates/setData', { items: data.data, overwriteDataState: true });

      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.loading = false;
    },

    async createTemplate() {
      const action = await this.$store.dispatch('modalAndDrawer/openDrawer', CreateOrEditTemplates);
      if (action instanceof GlobalDrawerCloseAction) return;
      this.data = action.template;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
<i18n src="@/locales/templates.locales.json" />
