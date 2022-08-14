import { DEFAULT_PRICE_DELIMITER } from '@/config/ui.config';

export default class PriceService {
  /**
   * Вернёт отформатированную дату
   * @example formatPrice({price: 10000, delimiter: '.'}): '10.000'
   *
   * @param {number|string} price
   * @param {string} delimiter
   * @return {string}
   */
  static formatPrice({ price, delimiter = DEFAULT_PRICE_DELIMITER }) {
    return price
      .toString()
      .split(/(?=(?:\d{3})+(?:\.|$))/g)
      .join(delimiter);
  }
}
