import { capitalize } from 'lodash';

/**
 * @param {string} str
 * @return {string}
 */
export function toCapitalize(str) {
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}
