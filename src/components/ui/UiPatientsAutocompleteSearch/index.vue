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
import { CRUDModel } from '@/models/CRUD.model';
import { User } from '@/models/User.model';

export default {
  name: 'UiPatientsAutocompleteSearch',
  props: {
    modelValue: Number,
    defaultUser: {
      type: [CRUDModel, Object],
      default: User,
    },
    // принимает все классы расширяющий CRUDModel
    modelForUse: [CRUDModel, Function],
    query: Object,
  },
  data() {
    return {
      query: '',
    };
  },

  methods: {
    async getPatients(query, cb) {
      this.$emit('update:modelValue', null);

      const { data } = await this.modelForUse.find({
        page: 1,
        per_page: 100,
        query_field: ['name', 'phone'],
        query_type: 'ILIKE',
        query_operator: 'OR',
        search: query,

        ...(query || {}),
      });

      cb(data.data);
    },

    selectHandler(payload) {
      this.$emit('update:modelValue', payload.id);
    },
  },

  mounted() {
    if (this.defaultUser) this.query = this.defaultUser.name;
  },
};
</script>

<style lang="scss" src="./index.scss" />
<i18n src="@/locales/base.locales.json" />
