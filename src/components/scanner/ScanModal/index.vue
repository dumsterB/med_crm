<template>
  <ElDialog
    custom-class="scan-modal"
    :title="$t('Title')"
    :model-value="modelValue"
    width="320px"
    @update:model-value="$emit('update:modelValue', $event)">
    <div class="scan-modal-content">
      <UiIcon class="scan-modal-content__icon" :icon="icons.SCAN" />
      <div class="scan-modal-content__text">{{ text || $t('Base.Scanning') }}</div>

      <input
        class="scan-modal-content__input"
        v-model="data"
        ref="input"
        @keydown.enter="$emit('scan:success', data)" />
    </div>
  </ElDialog>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';

export default {
  name: 'ScanModal',
  emits: ['update:modelValue', 'scan:success'],
  props: {
    modelValue: Boolean,
    text: String,
  },
  data() {
    return {
      data: null,
    };
  },
  watch: {
    modelValue: {
      handler(value) {
        this.data = null;
        if (value) setTimeout(() => this.$refs.input?.focus());
      },
      immediate: true,
    },
  },

  setup: () => ({
    icons,
  }),
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
