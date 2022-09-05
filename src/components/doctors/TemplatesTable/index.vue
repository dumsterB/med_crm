<template>
  <div class="queues-table-wrapper">
    <ElScrollbar class="queues-table-wrapper__scrollbar">
      <ElTable
        class="queues-table"
        v-loading="loading"
        :data="data"
        :empty-text="$t('Base.NoData')"
        ref="elTable">
        <ElTableColumn prop="title" :label="$t('Base.Templates')"></ElTableColumn>

        <ElTableColumn prop="actions" width="250" :label="$t('Base.Actions')">
          <template #default="{ row }">
            <div class="queues-table-actions">
              <ElButton @click="editTemplate(row)" type="primary">
                {{ $t('Base.Edit') }}
              </ElButton>
              <ElButton round @click="deleteTemplate(row)">
                <UiIcon :icon="$options.icons.TRASH" />
              </ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElScrollbar>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import CreateOrEditTemplates from '@/components/doctors/CreateOrEditTemplateDrawer/index.vue';
import { InspectionCardTemplate } from '@/models/InspectionCardTemplate.model';
import { GlobalDrawerCloseAction } from '@/models/client/ModalAndDrawer/GlobalDrawerCloseAction';

export default {
  name: 'TemplatesTable',
  props: {
    data: Array,
    loading: Boolean,
  },
  icons: icons,
  methods: {
    editTemplate(payload) {
      this.$store.dispatch('modalAndDrawer/openDrawer', {
        component: CreateOrEditTemplates,
        payload: {
          data: payload,
        },
      });
    },
    deleteTemplate(payload) {

      try {
        const action = InspectionCardTemplate.delete(payload.id);
        if (action instanceof GlobalDrawerCloseAction) return;
        this.$store.dispatch('templates/deleteItem', payload);
      }catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }



    },
  },
};
</script>

<style scoped></style>
