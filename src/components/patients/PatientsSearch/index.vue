<template>
  <div class="patients-search">
    <form class="patients-search__form" @submit.prevent="throttleSearch">
      <ElInput  v-model="queryWord.value" :placeholder="$t('InputLabel')" />
    </form>
    <ScanPatientBracelet @scan:success="redirectToPatientByBracelet" />

    <PatientsSearchPopover
      v-show="isOpenPopover"
      class="patients-search__popover"
      :search="queryWord.value"
      :patients="items"
      :loading="loading" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as icons from '@/enums/icons.enum.js';
import { throttle } from 'lodash';

import { useSearch } from '@/hooks/query';
import { SEARCH } from '@/enums/icons.enum';
import { PATIENT_ROUTE, PATIENTS_ROUTE } from '@/router/patients.routes';
import { Patient } from '@/models/Patient.model';

import PatientsSearchPopover from './PatientsSearchPopover/index.vue';
import ScanPatientBracelet from '@/components/scanner/ScanPatientBracelet/index.vue';

export default {
  name: 'PatientsSearch',
  components: { ScanPatientBracelet, PatientsSearchPopover },
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
      this.$refs.elInput.focus();
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

    redirectToPatientByBracelet({ patient }) {
      this.$router.push({
        name: PATIENT_ROUTE.name,
        params: {
          id: patient.id,
        },
      });
    },
  },

  mounted() {
    this.throttleSearch = throttle(this.search, 100);
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
<i18n src="@/locales/notifications.locales.json" />
<i18n src="./index.locales.json" />
