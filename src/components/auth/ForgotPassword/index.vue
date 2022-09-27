<template>
  <div class="forgot-password">
    <img height="70" src="@/assets/images/logo.svg" alt="">
    <div class="forgot-password__title">{{ $t('Title') }}</div>
    <div class="forgot-password__content">{{ $t('Content') }}</div>
    <img  src="@/assets/images/forgot-password.svg" alt="">
    <ElButton class="forgot-password__button-call" type="primary" @click="$emit('action:prev')">
      {{ $t('Base.Call') }}
    </ElButton>
    <ElButton class="forgot-password__button-prev"  @click="$emit('action:prev')">
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
<i18n src="@/locales/base.locales.json" />

