import { createI18n } from 'vue-i18n';
import { DEFAULT_LOCALE, FALLBACK_LOCALE } from '@/config/i18n.config';
import { loadGlobalLocales } from '@/utils/i18n.utils';

export const I18nPlugin = createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: loadGlobalLocales(),
});
