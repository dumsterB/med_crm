<template>
  <ElContainer class="layout-registry">
    <ElAside> <RegistryMenu /> </ElAside>

    <ElContainer>
      <ElHeader class="layout-registry__el-header">
        <RegistryHeader />
      </ElHeader>
      <ElMain> <slot></slot> </ElMain>
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
};
</script>

<style lang="scss" src="./index.scss" />
