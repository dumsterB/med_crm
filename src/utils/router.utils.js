/**
 * @param {string} path vue-router Router.path
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
