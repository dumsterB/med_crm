<template>
  <ElButton class="scan-bracelet-and-redirect-button" type="primary" plain @click="startScan">
    {{ text }}

    <input
      class="scan-bracelet-and-redirect-button__input"
      v-model="data"
      ref="input"
      @keydown.enter="scanHandler"
      @blur="isScanning = false" />
  </ElButton>
</template>

<script>
import { Patient } from '@/models/Patient.model';
import { PATIENT_ROUTE } from '@/router/patients.routes';

export default {
  name: 'ScanBraceletAndRedirectButton',
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
      this.$router.push({
        name: PATIENT_ROUTE.name,
        params: {
          id: patient.id,
        },
      });
      this.endScan();
    },

    endScan() {
      this.isScanning = false;
      this.isLoading = false;
      this.data = '';
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="./index.locales.json" />
