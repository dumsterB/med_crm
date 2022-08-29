<template>
  <div class="layout-content-header">
    <div class="layout-content-header__main layout-content-header-main">
      <slot>
        <h1 class="layout-content-header-main__title">
          <slot name="title"></slot>
        </h1>
      </slot>
    </div>

    <div class="layout-content-header__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutContentHeader',
  props: {
    title: String,
  },
};
</script>

<style lang="scss" src="./index.scss" />
