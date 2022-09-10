<template>
  <div class="multiple-select-disease-code">
    <UiModelsAutocompleteSearch
      :model-value="code"
      :model-for-use="DiseaseCode"
      label="title"
      value="code"
      :required="required && !codes.length"
      ref="autocomplete"
      @select="selectCode">
      <template #default="{ label, item }">
        <div class="multiple-select-disease-code__select-label">
          <span class="multiple-select-disease-code__code-text"> {{ item.code }} </span>
          <span> {{ label }} </span>
        </div>
      </template>
    </UiModelsAutocompleteSearch>

    <div class="multiple-select-disease-code-items">
      <ElTag
        class="multiple-select-disease-code-item"
        v-for="code in localFullCodes"
        :key="code.code"
        effect="plain"
        closable
        @close="deleteCode(code)">
        <span class="multiple-select-disease-code__code-text"> {{ code.code }} </span>
        <span> {{ code.title }} </span>
      </ElTag>
    </div>
  </div>
</template>

<script>
import { DiseaseCode } from '@/models/DiseasesCode.model';

export default {
  name: 'MultipleSelectDiseaseCode',
  emits: ['update:codes'],
  props: {
    codes: [Array],
    required: Boolean,
  },
  data() {
    return {
      code: null,
      /** @type {Array<DiseaseCode>} */
      localFullCodes: [],
    };
  },

  methods: {
    selectCode(code) {
      this.code = code.code;

      this.localFullCodes = [...this.localFullCodes, code];
      this.$emit('update:codes', [...new Set([...this.codes, code.code])]);

      setTimeout(() => {
        this.code = null;
        this.$refs.autocomplete.blur();
      });
    },

    deleteCode(diseasesCode) {
      this.localFullCodes = this.localFullCodes.filter((_code) => _code.code !== diseasesCode.code);
      this.$emit(
        'update:codes',
        this.codes.filter((_code) => _code !== diseasesCode.code)
      );
    },
  },

  setup: () => ({
    DiseaseCode,
  }),
};
</script>

<style lang="scss" src="./index.scss"></style>
