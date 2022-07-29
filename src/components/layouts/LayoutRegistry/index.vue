<template>
  <ElContainer class="layout-registry">
    <ElAside class="layout-registry__menu"> <RegistryMenu /> </ElAside>

    <ElContainer :class="['layout-registry__main', mainClass]">
      <ElHeader class="layout-registry__header layout-registry__el-header">
        <RegistryHeader />
      </ElHeader>
      <ElMain :class="['layout-registry__content', contentClass]"> <slot></slot> </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import RegistryHeader from '@/components/registry/RegistryHeader/index.vue';
import RegistryMenu from '@/components/registry/RegistryMenu/index.vue';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  components: { RegistryHeader, RegistryMenu },
  props: {
    contentClass: String,
    mainClass: String,
  },
};
</script>

<style lang="scss" src="./index.scss" />
