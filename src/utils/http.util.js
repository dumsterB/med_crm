/**
 * @private
 * @param { string } url
 * @param { object } query
 * @return { string } return url with query
 */
export function mergeOrCreateQuery({ url, query }) {
  const [urlExcludeQuery, inlineQueries] = url.split('?');

  const queries = new URLSearchParams(
    `${
      (inlineQueries || '') +
      Object.keys(query).reduce((acc, key) => acc + `&${key}=${query[key]}`, '')
    }`
  );

  return `${urlExcludeQuery}?${decodeURIComponent(queries.toString())}`;
}
