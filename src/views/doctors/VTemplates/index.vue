<template>
  <LayoutDoctor>
    <div>
      <el-button type="primary" @click="createTemplate">+ {{ $t('Templates.AddTemplate') }}</el-button>
      <div class="templates-content">
        <TemplatesTable :data="data" :loading="loading"></TemplatesTable>
      </div>
    </div>
  </LayoutDoctor>
</template>

<script>
import LayoutDoctor from '@/components/layouts/LayoutDoctor/index.vue';
import CreateOrEditTemplates from '@/components/doctors/CreateOrEditTemplateDrawer/index.vue';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model.js';
import { compareQueriesThenLoadData } from '@/utils/router.utils';
import { usePage, usePerPage, useSearch } from '@/hooks/query';
import TemplatesTable from '@/components/doctors/TemplatesTable/index.vue';
import { mapState } from 'vuex'
import {GlobalDrawerCloseAction} from "@/models/client/ModalAndDrawer/GlobalDrawerCloseAction";
export default {
  name: 'VTemplates',
  components: { LayoutDoctor, CreateOrEditTemplates, TemplatesTable },
  setup: () => ({
    perPage: usePerPage(),
    page: usePage(),
    search: useSearch(),
  }),
  data() {
    return {
      loading: false,
      arr: {
        id: 1,
      },
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
  computed:{
    ...mapState({
      data: (state) => state.templates.data,
    })
  },
  methods: {
    async getTemplates() {
      this.loading = true;

      try {
        const { data } = await InspectionCardTemplate.find({
          per_page: this.perPage.value,
          page: this.page.value,
          search: this.search.value,
          query_type: 'ILIKE',
          query_operator: 'OR',
          query_field: ['name', 'phone'],
        });
        this.$store.dispatch('templates/setData', {items: data.data, overwriteDataState: true})
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
      console.log(action)
      this.data = action.template
    },

  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
<i18n src="@/locales/templates.locales.json" />
