<template>
  <ElContainer>
    <ElHeader> </ElHeader>

    <ElContainer>
      <ElAside> </ElAside>
      <ElMain> <slot></slot> </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
};
</script>

<style lang="scss" src="./index.scss" />
