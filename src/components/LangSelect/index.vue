<template>
  <ElSelect class="lang-select" v-model="lang">
    <ElOption
      v-for="locale in locales"
      :key="locale.value"
      :label="locale.label"
      :value="locale.value" />
  </ElSelect>
</template>
<style lang="scss" src="./index.scss"></style>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util';
import { I18nService } from '@/services/i18n.service';
import { LOCALES } from '@/config/i18n.config';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
  computed: {
    lang: {
      get() {
        return I18nService.getLocale();
      },
      set(locale) {
        I18nService.setLocale(locale);
      },
    },

    locales() {
      return Object.keys(LOCALES).map((key) => ({ label: LOCALES[key], value: LOCALES[key] }));
    },
  },
};
</script>
