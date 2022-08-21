import { DATE_DELIMITER } from '@/config/dateAndTime.config';

/**
 * @param {string} date ISO
 * @param {object} [options]
 * @param {boolean} [options.withTime = false]
 * @param {boolean} [options.fullYear = false]
 */
export function ISOStringToDateAppFormat(date, options) {
  const _date = new Date(date);

  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  const hours = _date.getHours();
  const minutes = _date.getMinutes();

  // TODO: добавить обработку с аргументами из options
  return `${_addZeroPrefix(day)}${DATE_DELIMITER}${_addZeroPrefix(month)}${DATE_DELIMITER}${year
    .toString()
    .slice(2)}`;
}

/**
 * @param {string} date DD.MM.YY hh:mm | DD.MM.YYYY hh:mm
 * @return {string} ISO
 */
export function dateAppFormatToISOString(date) {
  // TODO доработать работу с таймзонами
  const [onlyDate, onlyTime] = date.split(' ');
  let [hours, minutes] = onlyTime?.split(':') || [0, 0];
  let [day, month, year] = onlyDate.split('.');
  year = year.length === 2 ? `20${year}` : year;

  return new Date(
    +year,
    +month - 1,
    +day,
    +hours,
    +minutes - new Date().getTimezoneOffset() // для быстрого фикса при использования календаря
  ).toISOString();
}

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
 * @param {string} date ISO format
 * @return {number}
 */
export function getDaysInMonth(date) {
  const year = date.match(/^\d\d\d\d/)[0];
  const month = date.match(/^(\d\d\d\d)-(\d\d)/)[2] - 1;

  return 33 - new Date(+year, +month, 33).getDate();
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
 * @param {object} [options]
 * @param {"next"|"prev"} options.type = "next"
 * @return {string}
 */
export function prevOrNextMonthByISOString(date, options = { type: 'next' }) {
  let _date = new Date(date);
  let newMonthDate = new Date(date);
  newMonthDate.setMonth(options.type === 'next' ? _date.getMonth() + 1 : _date.getMonth() - 1, 1);

  const oldDay = _date.getDate();
  const daysInNewMonth = getDaysInMonth(newMonthDate.toISOString());
  newMonthDate.setDate(oldDay > daysInNewMonth ? daysInNewMonth : oldDay);

  return newMonthDate.toISOString();
}

/**
 * @example 2022-09-30T00:00:00.000Z  ->  2022-08-30T00:00:00.000Z || 2022-10-30T00:00:00.000Z
 * @param {string} date ISO format
 * @param {object} [options]
 * @param {"next"|"prev"} options.type = "next"
 * @return {string}
 */
export function prevOrNextDayByISOString(date, options = { type: 'next' }) {
  const _date = new Date(date);
  _date.setDate(options.type === 'next' ? _date.getDate() + 1 : _date.getDate() - 1);

  return _date.toISOString();
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
