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
 * Создаёт children роуты исходя из childrenMap
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

  const insertComponentsInRoutes = (routes) => {
    return routes.map((route) => {
      const component = components[route.component];
      const children = insertComponentsInRoutes(
        createChildrenRoutesByChildrenMap(route.childrenMap || {})
      );

      return {
        ...route,
        component,
        children,
      };
    });
  };

  return insertComponentsInRoutes(routes);
}

/**
 * Преобразует объект с именнованными роутами в обычный массив, который необходим для vue-router
 *
 * @param {object} childrenMap
 * @return {Array<object>}
 */
export function createChildrenRoutesByChildrenMap(childrenMap) {
  return Object.keys(childrenMap).map((key) => childrenMap[key]);
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
  const _fieldsForResetPage = [...defaultFieldsForReset, ...fieldsForResetPage];
  const queryKeys = Object.keys(query);

  for (let i = 0; i < queryKeys.length; i++) {
    if (query && oldQuery && query[_fieldsForResetPage[i]] !== oldQuery[_fieldsForResetPage[i]]) {
      resetPage();
      return setTimeout(() => getData());
    }

    if (!oldQuery || query[queryKeys[i]] !== oldQuery[queryKeys[i]]) {
      return getData();
    }
  }
}
