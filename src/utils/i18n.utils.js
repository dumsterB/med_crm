import { LOCALES } from '@/config/i18n.config';
import * as localesModules from '@/locales/index';

/**
 * Загружает все файлы из @/locales и возвращает объект для i18n
 * @return {object}
 */
export function loadGlobalLocales() {
  const locales = _generateLocalesEmptyObject();

  for (let moduleKey in localesModules) {
    const module = localesModules[moduleKey];
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
