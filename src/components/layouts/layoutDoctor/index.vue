<template>
  <LayoutDefault v-bind="$attrs">
    <template #header>
      <DoctorsHeader />
    </template>

    <template #menu>
      <DoctorsMenu />
    </template>

    <template #default>
      <slot></slot>
    </template>
  </LayoutDefault>
</template>

<script>
import DoctorsHeader from '@/components/doctors/DoctorsHeader/index.vue';
import DoctorsMenu from '@/components/doctors/DoctorsMenu/index.vue';
import LayoutDefault from '@/components/layouts/LayoutDefault/index.vue';

export default {
  name: 'LayoutRegistry',
  components: { LayoutDefault, DoctorsHeader, DoctorsMenu },
};
</script>

<style lang="scss" src="./index.scss" />
