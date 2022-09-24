<template>
  <div class="layout-content-language">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <div class="layout-content-language-dropdown">
          <UiIcon class="layout-content-language__icon" :icon="`${lang.icon}`" />
          <span class="layout-content-language__text">{{lang.label}}</span>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <div class="layout-content-language-dropdown">
              <UiIcon class="layout-content-language__icon" :icon="icons.RUSSIAN" />
              <span class="layout-content-language__text">Русский</span>
            </div></el-dropdown-item
          >
          <el-dropdown-item>
            <div class="layout-content-language-dropdown">
              <UiIcon class="layout-content-language__icon" :icon="icons.UZBEKISTAN" />
              <span class="layout-content-language__text">Узбекский</span>
            </div></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div></div>
  </div>
</template>

<script>
import * as icons from '@/enums/icons.enum.js';
import './index.scss';
import { I18nService } from '@/services/i18n.service';
import { LOCALES } from '@/config/i18n.config';

export default {
  name: 'index',
  currentLanguage: 'icons.RUSSIAN',
  data() {
    return {
      locales: [
        {
          locale: 'ru',
          icon: 'icons.RUSSIAN',
          label: 'Русский',
        },
        {
          locale: 'uz',
          icon: 'icons.UZBEKISTAN',
          label: 'Узбекский',
        },
      ],
    };
  },
  computed: {
    lang: {
      get() {
        let currentLang = I18nService.getLocale();
        return this.locales.find(ell=>ell.locale == currentLang)
      },
      set(locale) {
        I18nService.setLocale(locale);
      },
    },
    locales() {
      return Object.keys(LOCALES).map((key) => ({
        label: LOCALES[key].label,
        value: LOCALES[key].id,
      }));
    },
  },
  methods: {
    handleCommand(event) {

    },
  },
  setup: () => ({
    icons,
  }),
};
</script>

<style scoped></style>
