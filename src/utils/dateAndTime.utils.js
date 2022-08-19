/**
 * @param {string} date format - DD.MM.YY hh:mm
 */
export function excludeDate(date) {
  return date.split(' ')[1];
}

/**
 * @param {object} [options]
 * @param {boolean} [options.withTime = false]
 * @return {string} format - DD.MM.YY  or  DD.MM.YY hh:mm
 */
export function getCurrentDate(options) {
  const year = getCurrentYear();
  const month = getCurrentMonth();
  const day = getCurrentDay();
  const hours = getCurrentHours();
  const minutes = getCurrentMinutes();

  return options?.withTime
    ? `${day}.${month}.${year} ${hours}:${minutes}`
    : `${day}.${month}.${year}`;
}

/** @return {string} format - YY */
export function getCurrentYear() {
  return new Date().getFullYear().toString().slice(2);
}

/** @return {string} format - MM */
export function getCurrentMonth() {
  return _addZeroPrefix(new Date().getMonth() + 1);
}

/** @return {string|number} format - DD */
export function getCurrentDay() {
  return _addZeroPrefix(new Date().getDate());
}

/** @return {string|number} format - hh */
export function getCurrentHours() {
  return _addZeroPrefix(new Date().getHours());
}

/** @return {string|number} format - mm */
export function getCurrentMinutes() {
  return _addZeroPrefix(new Date().getMinutes());
}

/**
 * @param {string|number} [year]
 * @param {string|number} [month] counting starts from 0
 * @return {number}
 */
export function getDaysInMonth({ year, month }) {
  let currentYear = year || new Date().getFullYear();
  let fullYear = currentYear.toString().length === 2 ? `20${currentYear}` : currentYear;
  let currentMonth = month || new Date().getMonth();

  return 33 - new Date(+fullYear, +currentMonth, 33).getDate();
}

/**
 * @example 2022-09-30T19:02:00.000Z -> 2022-09-30T00:00:00.000Z
 * @param {string} date ISO format
 * @return {string}
 */
export function resetTimeInISOString(date) {
  return date.replace(/T\d\d:\d\d:\d\d\.\d\d\dZ/gm, 'T00:00:00.000Z');
}

/**
 * @example 2022-09-30T00:00:00.000Z -> 2022-09-01T00:00:00.000Z
 * @param {string} date ISO format
 * @return {string}
 */
export function resetDaysInISOString(date) {
  return date.replace(/\d\dT/gm, '01T');
}

/**
 * @example 2022-09-30T00:00:00.000Z  ->  2022-08-30T00:00:00.000Z || 2022-10-30T00:00:00.000Z
 * @param {string} date ISO format
 * @param {object} [payload]
 * @param {"next"|"prev"} payload.type = "next"
 * @return {string}
 */
export function prevOrNextMonthByISOString(date, payload = { type: 'next' }) {
  return date.replace(/(\d\d\d\d)-(\d\d)-(\d\d)T/gm, (val, year, month, days) => {
    const newMonth = _addZeroPrefix(payload.type === 'next' ? +month + 1 : +month - 1);

    return `${year}-${newMonth}-${days}T`;
  });
}

/**
 * Добавляет ноль если длина строки или число имеет один символов
 * @param {string|number} value
 * @return {string|number}
 * @private
 */
function _addZeroPrefix(value) {
  return value?.toString().length < 2 ? '0' + value : value;
}
