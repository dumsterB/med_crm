import { LOCALES } from '@/config/i18n.config';

/**
 * Загружает все файлы из @/locales и возвращает объект для i18n
 * @return {object}
 */
export function loadGlobalLocales() {
  const localesModules = import.meta.glob('@/locales/**/*.locales.json', { eager: true });
  const locales = _generateLocalesEmptyObject();

  for (let moduleKey in localesModules) {
    const module = localesModules[moduleKey].default;

    Object.keys(module).forEach((langKey) => {
      locales[langKey] = {
        ...locales[langKey],
        ...module[langKey],
      };
    });
  }

  return locales;
}

/**
 * @private
 * @return {object} return empty object with locales
 * @example return {en: {}, ru: {}}
 */
function _generateLocalesEmptyObject() {
  const locales = {};
  Object.keys(LOCALES).forEach((key) => (locales[LOCALES[key]] = {}));

  return locales;
}
