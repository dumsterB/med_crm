<template>
  <div class="patients-search">
    <div class="patients-search-scan-and-header">
      <form class="patients-search__form" @submit.prevent="throttleSearch">
        <ElInput v-model="queryWord.value" :placeholder="$t('InputLabel')"> </ElInput>
      </form>
      <div class="patients-content-scan" @click="scanHandler">
        <UiIcon :icon="icons.SCAN" />
        <span class="layout-content-scan__text">{{ $t('Base.ScanBracelet') }}</span>
      </div>
    </div>
    <div class="patients-scanner-container">
      <div v-show="!isLoading">
        <video poster="data:image/gif,AAAA" ref="scanner"></video>
        <div class="overlay-element"></div>
        <div class="laser"></div>
      </div>
    </div>
    <PatientsSearchPopover
      v-show="isOpenPopover"
      class="patients-search__popover"
      :search="queryWord.value"
      :patients="items"
      :loading="loading" />
  </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from '@zxing/library';
import * as icons from '@/enums/icons.enum.js';
import { mapState, mapActions } from 'vuex';
import { throttle, debounce } from 'lodash';
import { useSearch } from '@/hooks/query';
import { SEARCH } from '@/enums/icons.enum';
import { Patient } from '@/models/Patient.model';
import { PATIENTS_ROUTE } from '@/router/patients.routes';

import PatientsSearchPopover from './PatientsSearchPopover/index.vue';

export default {
  name: 'PatientsSearch',
  components: { PatientsSearchPopover },
  icons: { SEARCH },

  setup: () => ({
    queryWord: useSearch(),
    icons: icons,
  }),
  data() {
    return {
      isOpenPopover: false,
      throttleSearch: null, // void
      isLoading: true,
      result: null,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
        navigator && navigator.mediaDevices && 'enumerateDevices' in navigator.mediaDevices,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.patients.data,
      total: (state) => state.patients.total,
      loading: (state) => state.patients.loading,
    }),

    isDisabledByPatientsPages() {
      return this.$route.name === PATIENTS_ROUTE.name;
    },
  },
  watch: {
    'queryWord.value': {
      handler(value) {
        if (this.isDisabledByPatientsPages) return;

        if (value && value.length) this.throttleSearch();
        if (value && !this.isOpenPopover) this.isOpenPopover = true;
        if ((!value || !value.length) && this.isOpenPopover) this.isOpenPopover = false;
      },
    },
  },

  methods: {
    ...mapActions({
      setLoading: 'patients/setLoading',
      setData: 'patients/setData',
    }),
    scanHandler() {
      this.start();
    },
    start() {
      this.codeReader.decodeFromVideoDevice(undefined, this.$refs.scanner, (result, err) => {
        if (result) {
          this.$emit('decode', result.text);
          this.result = result.text;
        }
      });
    },
    async search() {
      if (this.isDisabledByPatientsPages || this.loading) return;
      this.setLoading(true);

      try {
        const { data } = await Patient.find({
          page: 1,
          per_page: 100,
          search: this.queryWord.value?.trim(),
          query_field: ['name', 'phone'],
          query_type: 'ILIKE',
          query_operator: 'OR',
        });
        this.setData({
          items: data.data,
          total: data.meta.total,
          overwriteDataState: true,
        });

        this.isOpenPopover = true;
      } catch (err) {
        console.log(err);
        this.$notify({
          type: 'error',
          title: err?.response?.data?.message || this.$t('Notifications.Error'),
        });
      }

      this.setLoading(false);
    },
  },
  mounted() {
    this.throttleSearch = debounce(this.search, 100);
    if (!this.isMediaStreamAPISupported) {
      throw new Exception('Media Stream API is not supported');
      return;
    }
    this.$refs.scanner.oncanplay = (event) => {
      this.isLoading = false;
      this.$emit('loaded');
    };
  },
  beforeUnmount() {
    this.codeReader.reset();
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
