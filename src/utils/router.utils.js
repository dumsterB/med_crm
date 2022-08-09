/**
 * @param {string} route vue-router Router.path
 * @param {object} params params for replace
 */
export function insertRouteParams({ route, params }) {
  return route.replace(/:[a-zA-Z]*/gim, (str) => {
    const paramKey = str.split(':')[1];
    return params[paramKey];
  });
}
