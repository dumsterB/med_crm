<template>
  <ElContainer class="layout-default">
    <ElAside class="layout-default__menu">
      <slot name="menu"> </slot>
    </ElAside>

    <ElContainer
      :class="[
        'layout-default__main ',
        { 'layout-default__main_fix-height': fixHeight },
        mainClass,
      ]">
      <ElHeader class="layout-default__header layout-default__el-header">
       <slot name="header"> </slot>
      </ElHeader>

      <ElMain :class="['layout-default__content', contentClass]" v-loading="loading">
        <slot></slot>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script>
export default {
  name: 'LayoutDefault',
  props: {
    fixHeight: Boolean,
    contentClass: String,
    mainClass: String,
    loading: Boolean,
  },
};
</script>

<style lang="scss" src="./index.scss" />
