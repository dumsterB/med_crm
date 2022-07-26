<template>
  <div class="layout-auth">
    <ElHeader :class="['layout-auth__header', 'layout-auth-header', headerClass]">
      <div class="layout-auth-header__actions">
        <LangSelect />
      </div>
    </ElHeader>

    <div :class="['layout-auth__content', contentClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import LangSelect from '@/components/LangSelect/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { LangSelect },
  props: {
    contentClass: String,
    headerClass: String,
  },
};
</script>

<style lang="scss" src="./index.scss" />
