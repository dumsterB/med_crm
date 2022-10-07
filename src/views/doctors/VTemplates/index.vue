<!-- TODO: удалить или переделать -->
<template>
  <LayoutDoctor fixHeight>
    <LayoutContentHeader>
      <template #actions>
        <ElButton type="primary" @click="createTemplate">
          + {{ $t('Templates.AddTemplate') }}
        </ElButton>
      </template>
    </LayoutContentHeader>

    <TemplatesTable
      class="v-templates-content__table"
      :data="data"
      :loading="loading"></TemplatesTable>
  </LayoutDoctor>
</template>

<script>
import { mapState } from 'vuex';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model.js';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { usePage, usePerPage } from '@/hooks/query';
import { GlobalModalCloseAction } from '@/models/client/ModalAndDrawer/GlobalModalCloseAction';

import LayoutContentHeader from '@/components/layouts/assets/LayoutContentHeader/index.vue';
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';
import CreateOrEditTemplateModal from '@/components/doctors/CreateOrEditTemplateModal/index.vue';
import TemplatesTable from '@/components/doctors/TemplatesTable/index.vue';

export default {
  name: 'VTemplates',
  components: { LayoutContentHeader, LayoutDoctor, TemplatesTable },
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
        perPage: this.perPage.value,
        page: this.page.value,
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
      const action = await this.$store.dispatch(
        'modalAndDrawer/openModal',
        CreateOrEditTemplateModal
      );
      if (action instanceof GlobalModalCloseAction) return;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
<i18n src="@/locales/templates.locales.json" />
