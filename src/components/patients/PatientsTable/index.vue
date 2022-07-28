<template>
  <ElTable class="patients-table" :data="items" @row-click="goToPatient">
    <ElTableColumn prop="name" label="name">
      <template #default="{ row }">
        <div class="patients-table__name-avatar">
          <UiAvatar :image="row.avatar" />
          <span> {{ row.name }} </span>
        </div>
      </template>
    </ElTableColumn>

    <ElTableColumn prop="gender" label="gender"></ElTableColumn>
    <ElTableColumn prop="phone" label="phone"></ElTableColumn>
    <ElTableColumn prop="age" label="age"></ElTableColumn>

    <ElTableColumn prop="childrens_count" label="childrens">
      <template #default="{ row }">
        <span v-if="!!row.childrens_count"> {{ row.childrens_count }} </span>
        <ElButton v-else type="primary" plain small>
          <UiIcon :icon="$options.icons.PLUS" />
        </ElButton>
      </template>
    </ElTableColumn>

    <ElTableColumn prop="actions" label="actions"></ElTableColumn>
  </ElTable>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { REGISTRY_PATIENT_ROUTE } from '@/router/registry.routes';
import * as icons from '@/enums/icons.enum.js';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  props: {
    /**
     * @param { Array<Patient|object> } items
     */
    items: Array,
    page: Number,
    perPage: Number,
    total: Number,
  },
  icons: icons,

  computed: {
    pagesCount() {
      return Math.ceil(this.total / this.perPage);
    },
  },

  methods: {
    goToPatient(payload) {
      this.$router.push({
        name: REGISTRY_PATIENT_ROUTE.name,
        params: { id: payload.id },
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
