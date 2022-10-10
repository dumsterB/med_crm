<template>
  <ElButton
    :class="['scan-patient-bracelet', { 'scan-patient-bracelet_only-icon': onlyIcon }]"
    type="primary"
    plain
    :disabled="disabled"
    @click="startScan">
    <template #icon> <UiIcon :icon="icons.SCAN" /> </template>
    <div v-if="!onlyIcon">{{ text }}</div>

    <ScanModal
      :model-value="modalIsOpen"
      :text="isLoading ? $t('Base.Loading') : null"
      ref="scanModal"
      @scan:success="scanHandler"
      @update:model-value="updateModalModelValueHandler" />
  </ElButton>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { Patient } from '@/models/Patient.model';
import ScanModal from '@/components/scanner/ScanModal/index.vue';

export default {
  name: 'ScanPatientBracelet',
  components: { ScanModal },
  emits: ['scan:success'],
  props: {
    disabled: Boolean,
    onlyIcon: Boolean,
  },
  data() {
    return {
      isScanning: false,
      isLoading: false,
      modalIsOpen: false,
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
      this.modalIsOpen = true;
    },

    async scanHandler(data) {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const patient = await Patient.getByBraceletPayload(data);
        this.$emit('scan:success', { patient });
        this.endScan();
      } catch (err) {
        console.log(err);
        this.$notify({ type: 'error', title: err?.message });
        this.$refs.scanModal.reset();
      }

      this.isLoading = false;
    },

    endScan() {
      this.isScanning = false;
      this.isLoading = false;
      this.modalIsOpen = false;
      this.data = '';
    },

    updateModalModelValueHandler(value) {
      if (!value) this.endScan();
      this.modalIsOpen = value;
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
