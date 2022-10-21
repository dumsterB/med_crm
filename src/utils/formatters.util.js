/**
 * @param {string} value
 * @return {string|null}
 */
export function onlyLatinFormatter(value) {
  return value?.replaceAll(/[а-яА-Я]/gim, '') ?? null;
}
