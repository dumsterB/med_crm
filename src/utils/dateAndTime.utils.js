/**
 * @param {string} date format - DD.MM.YY mm:ss
 */
export function excludeDate(date) {
  return date.split(' ')[1];
}
