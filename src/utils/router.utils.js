import { PER_PAGE, SEARCH } from '@/enums/query.enum';

/**
 * @param {string} path vue-router Route.path
 * @param {object} params params for replace
 */
export function insertRouteParams({ path, params }) {
  return path.replace(/:[a-zA-Z]*/gim, (str) => {
    const paramKey = str.split(':')[1];
    return params[paramKey];
  });
}

/**
 * Подставляет компоненты в объект опций роута
 *
 * @param {Array<VueRouteOptions>} routes
 * @return {Array<VueRouteOtions>}
 */
export function setComponentInRoutesByViewsFolder({ routes }) {
  const views = import.meta.glob('@/views/**/*.vue', { eager: true });
  const components = {};
  for (let key in views) {
    const component = views[key].default;
    components[component.name] = component;
  }

  return routes.map((route) => ({
    ...route,
    component: components[route.component],
  }));
}

/**
 * Функция для сравненния двух query объектов, выполнения необходимых действий сброса некоторых ключей и дальнейшего получения данных
 *
 * @param {object} query объект с ключами равными общим query параметрам для данных и таблиц. perPage, page, search ...
 * @param {object} oldQuery
 * @param {Array<string>} [fieldsForResetPage = [per_page, search]] ключи в query, при изменение которых надо сбросить страницу
 * @param {function} resetPage функция для сброса текущей страницы при необходимости
 * @param {function} getData функция для получения данных
 * @return {number|undefined} может вернуть счётчик от вызова setTimeout
 */
export function compareQueriesThenLoadData({
  query,
  oldQuery,
  fieldsForResetPage = [],
  resetPage,
  getData,
}) {
  const defaultFieldsForReset = [PER_PAGE, SEARCH];

  [...defaultFieldsForReset, ...fieldsForResetPage].forEach((key) => {
    if (query && oldQuery && query[key] !== oldQuery[key]) {
      resetPage();
      return setTimeout(() => getData());
    }
  });

  getData();
}
