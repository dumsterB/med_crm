<template>
  <div class="layout-auth">
    <ElHeader :class="['layout-auth__header', 'layout-auth-header', headerClass]">
      <img class="layout-auth-header__img" src="@/assets/images/logo.svg" alt="">
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
import LangSelect from '@/components/LangSelect/index.vue';

export default {
  name: 'LayoutAuth',
  components: { LangSelect },
  props: {
    contentClass: String,
    headerClass: String,
  },
};
</script>

<style lang="scss" src="./index.scss" />
