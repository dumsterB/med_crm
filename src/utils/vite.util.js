/**
 * @param { string } url значение import.meta.url
 * @return { string } возвращает название родительской папки
 */
export function getParentFolderNameByPath(url) {
  const paths = url.split('/');
  return paths[paths.length - 2];
}

/**
 * Для vue компонентов
 * @param { string } url значение import.meta.url
 * @return {string} возвращает название файла
 */
export function getFileNameByPath(url) {
  const paths = new URL(url).pathname.split('/');
  return paths[paths.length - 1].split('.')[0];
}
