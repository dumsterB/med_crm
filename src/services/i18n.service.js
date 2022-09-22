import { I18nPlugin } from '@/plugins/i18n.plugin';
import { DEFAULT_LOCALE, LOCALES } from '@/config/i18n.config';
import { ApiService } from '@/services/api.service';

export class I18nService {
  static locales = Object.keys(LOCALES).map((key) => LOCALES[key].id);
  static LOCALE_STORAGE_KEY = 'LOCALE';

  static t(payload) {
    return I18nPlugin.global.t(payload);
  }
  static tc(payload, options) {
    return I18nPlugin.global.tc(payload, options);
  }
  static te(payload) {
    return I18nPlugin.global.te(payload);
  }
  static tm(payload) {
    return I18nPlugin.global.tm(payload);
  }

  /**
   * возвращает язык из i18n экземпляра
   * @return {Locale | WritableComputedRef<Locale>}
   */
  static getLocale() {
    return I18nPlugin.global.locale;
  }
  static setLocale(locale) {
    if (!this.checkHasLocale(locale)) {
      console.error(`${locale} - incorrect locale.\nSupported locales - ${this.locales.join(',')}`);
      locale = DEFAULT_LOCALE;
    }

    I18nPlugin.global.locale = locale;
    ApiService.setLocale(locale);
    localStorage.setItem(this.LOCALE_STORAGE_KEY, locale);
  }
  static setLocaleFromStorage() {
    this.setLocale(localStorage.getItem(this.LOCALE_STORAGE_KEY) || DEFAULT_LOCALE);
  }
  static checkHasLocale(locale) {
    return this.locales.includes(locale);
  }
}
