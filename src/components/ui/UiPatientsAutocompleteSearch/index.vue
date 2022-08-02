<template>
  <ElAutocomplete
    class="ui-patients-autocomplete-search"
    v-model="query"
    :placeholder="$t('Base.PleaseInput')"
    :fetch-suggestions="getPatients"
    :debounce="250"
    @select="selectHandler"
    v-bind="$attrs">
  </ElAutocomplete>
</template>

<script>
import { getParentFolderNameByPath } from '@/utils/vite.util';
import { Patient } from '@/models/Patient.model';

export default {
  name: getParentFolderNameByPath(import.meta.url),
  props: {
    modelValue: Number,
  },
  data() {
    return {
      query: null,
    };
  },

  methods: {
    async getPatients(query, cb) {
      this.$emit('update:modelValue', null);

      const { data } = await Patient.find({
        page: 1,
        per_page: 100,
        query_field: ['name', 'phone'],
        query_type: 'ILIKE',
        query_operator: 'OR',
        search: query,
      });

      cb(data.data.map((patient) => ({ value: patient.name, patient: patient })));
    },

    selectHandler(payload) {
      this.$emit('update:modelValue', payload.patient.id);
    },
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
