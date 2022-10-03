<template>
  <ElButton
    :class="['scan-patient-bracelet', { 'scan-patient-bracelet_only-icon': onlyIcon }]"
    type="primary"
    plain
    @click="startScan">
    <template #icon> <UiIcon :icon="icons.SCAN" /> </template>
    <div v-if="!onlyIcon">{{ text }}</div>

    <input
      class="scan-patient-bracelet__input"
      v-model="data"
      ref="input"
      @keydown.enter="scanHandler"
      @blur="isScanning = false" />
  </ElButton>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Patient } from '@/models/Patient.model';

export default {
  name: 'ScanPatientBracelet',
  props: {
    onlyIcon: Boolean,
  },
  data() {
    return {
      isScanning: false,
      isLoading: false,
      data: null,
    };
  },
  computed: {
    text() {
      if (this.isLoading) return this.$t('Base.Loading');
      if (this.isScanning) return this.$t('Base.Scanning');

      return this.$t('Base.ScanBracelet');
    },
  },

  methods: {
    startScan() {
      if (this.isScanning) return;
      this.isScanning = true;
      this.$refs.input.focus();
    },

    async scanHandler() {
      if (this.isLoading) return;
      this.isLoading = true;

      const patient = await Patient.getByBraceletPayload(this.data);
      this.endScan();
      this.$emit('scan:success', { patient });
    },

    endScan() {
      this.isScanning = false;
      this.isLoading = false;
      this.data = '';
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
