<template>
  <LayoutDefault v-bind="$attrs">
    <template #header>
      <RegistryHeader />
    </template>

    <template #menu>
      <RegistryMenu />
    </template>

    <template #default>
      <slot></slot>
    </template>
  </LayoutDefault>
</template>

<script>
import RegistryHeader from '@/components/registry/RegistryHeader/index.vue';
import RegistryMenu from '@/components/registry/RegistryMenu/index.vue';
import LayoutDefault from '@/components/layouts/LayoutDefault/index.vue';

export default {
  name: 'LayoutRegistry',
  components: { LayoutDefault, RegistryHeader, RegistryMenu },
};
</script>

<style lang="scss" src="./index.scss" />
