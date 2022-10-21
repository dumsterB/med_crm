<template>
  <div class="lang-select">
    <ElDropdown @command="setLocale">
      <div class="lang-select-dropdown">
        <UiIcon class="lang-select__icon" :icon="getCurrentLocale.icon" />
        <span class="lang-select__text">{{ getCurrentLocale.label }}</span>
      </div>

      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem :command="locale" v-for="locale of locales" :key="locale.locale">
            <div class="lang-select-dropdown">
              <UiIcon class="lang-select__icon" v-if="locale.icon" :icon="locale.icon" />
              <span class="lang-select__text">{{ locale.label }}</span>
            </div>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import { I18nService } from '@/services/i18n.service';
import { LOCALES } from '@/config/i18n.config';

export default {
  name: 'LangSelect',
  computed: {
    locales() {
      return Object.keys(LOCALES).map((key) => ({
        label: LOCALES[key].label,
        value: LOCALES[key].id,
        icon: this.iconsByLang[LOCALES[key].id],
      }));
    },

    getCurrentLocale() {
      let currentLang = I18nService.getLocale();
      return this.locales.find((ell) => ell.value == currentLang);
    },
  },
  methods: {
    setLocale(locale) {
      I18nService.setLocale(locale.value);
    },
  },
  setup: () => ({
    icons,

    iconsByLang: {
      [LOCALES.RU.id]: icons.RUSSIAN,
      [LOCALES.UZ.id]: icons.UZBEKISTAN,
    },
  }),
};
</script>

<style scoped>
.el-dropdown-menu{
  padding: 2px!important;
}
</style>
<style lang="scss" src="./index.scss" />
