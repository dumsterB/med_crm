<template>
  <div class="forgot-password">
    <div class="forgot-password__title">{{ $t('Title') }}</div>
    <div class="forgot-password__content">{{ $t('Content') }}</div>
    <ElButton type="primary" @click="$emit('action:prev')">
      {{ $t('Prev') }}
    </ElButton>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  emits: ['action:prev'],
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="./index.locales.json" />
