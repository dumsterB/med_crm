<template>
  <ElAutocomplete
    class="ui-patients-autocomplete-search"
    value-key="name"
    v-model="query"
    :placeholder="$t('Base.PleaseInput')"
    :fetch-suggestions="getUsers"
    :debounce="250"
    :required="required"
    :disabled="disabled"
    @select="selectHandler">
  </ElAutocomplete>
</template>

<script>
import { CRUDModel } from '@/models/CRUD.model';

export default {
  name: 'UiUsersAutocompleteSearch',
  props: {
    modelValue: Number,
    defaultUser: [CRUDModel, Object],
    // принимает все классы расширяющий CRUDModel
    modelForUse: [CRUDModel, Function],
    searchQuery: Object,
    required: Boolean,
    disabled: Boolean,
  },
  data() {
    return {
      query: '',
    };
  },
  watch: {
    modelValue: {
      handler(value) {
        if (!value) this.query = '';
      },
      immediate: true,
    },
  },

  methods: {
    async getUsers(query, cb) {
      this.$emit('update:modelValue', null);

      const { data } = await this.modelForUse.find({
        page: 1,
        per_page: 100,
        query_field: ['name', 'phone'],
        query_type: 'ILIKE',
        query_operator: 'OR',
        search: query,

        ...(this.searchQuery || {}),
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
