export function onlyLatinFormatter(value) {
  return value.replaceAll(/[а-яА-Я]/gim, '');
}
