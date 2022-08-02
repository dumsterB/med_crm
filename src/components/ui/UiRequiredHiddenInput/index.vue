<template>
  <ElInput class="ui-required-hidden-input" :model-value="modelValue" required v-bind="$attrs" />
</template>

<script>
export default {
  name: 'UiRequiredHiddenInput',
  props: ['modelValue'],
};
</script>

<style lang="scss" src="./index.scss" />
