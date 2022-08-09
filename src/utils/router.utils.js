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
