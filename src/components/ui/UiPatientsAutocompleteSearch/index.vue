<template>
  <ElAutocomplete
    class="ui-patients-autocomplete-search"
    v-model="query"
    value-key="name"
    :placeholder="$t('Base.PleaseInput')"
    :fetch-suggestions="getPatients"
    :debounce="250"
    @select="selectHandler"
    v-bind="$attrs">
  </ElAutocomplete>
</template>

<script>
import { Patient } from '@/models/Patient.model';

export default {
  name: 'UiPatientsAutocompleteSearch',
  props: {
    modelValue: Number,
    defaultPatient: [Patient, Object],
  },
  data() {
    return {
      query: '',
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

      cb(data.data);
    },

    selectHandler(payload) {
      this.$emit('update:modelValue', payload.id);
    },
  },

  mounted() {
    if (this.defaultPatient) this.query = this.defaultPatient.name;
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
