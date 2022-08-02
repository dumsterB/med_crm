/**
 * @param {string} str
 * @return {string}
 */
export function toCapitalize(str) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.split('').splice(1).join(''))
    .join(' ');
}
