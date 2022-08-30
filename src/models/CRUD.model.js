import { ApiService } from '@/services/api.service';
import { mergeOrCreateQuery } from '@/utils/http.util';
import { deleteEmptyValueKeys } from '@/utils/object.util';
import { QUERY_ARRAY_SEPARATOR } from '@/config/api.config';

/**
 * @class CRUDModel
 */
export class CRUDModel {
  static modelName = 'model';
  static tableName = 'models';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {any} payload[key]
   */
  constructor(payload) {
    this.id = payload?.id ?? null;
  }

  /**
   * @param { string } _url
   * @param { number } per_page
   * @param { number } page
   * @param { string } [order_by]
   * @param { "ASC"|"DESC" } order_direction
   * @param { string } query
   * @param { string|Array<string> } query_field
   * @param { "ILIKE"|"EQUALS"|"IN" } query_type
   * @param { "AND"|"OR" } query_operator
   * @param { string } search
   * @param { object } args
   * @return { Promise<{ response: AxiosResponse<any>, data: response.data }> } data = response.data
   */
  static async find({
    _url,
    per_page,
    page,
    order_by,
    order_direction,
    query_field,
    query_type,
    query_operator,
    search,
    ...args
  }) {
    const urlWithQuery = mergeOrCreateQuery({
      url: _url || this.tableName,
      query: deleteEmptyValueKeys({
        per_page,
        page,
        order_by,
        order_direction,
        query_field,
        query_type,
        query_operator,
        search,
        ...args,
      }),
    });

    const response = await ApiService.get(urlWithQuery);
    return { response, data: response.data };
  }

  /**
   * @param { number } id
   * @return { Promise<{ response: AxiosResponse<any>, data: response.data }> }
   */
  static async findOneById(id) {
    const response = await ApiService.get(`${this.tableName}/${id}`);

    return { response, data: response.data };
  }

  /**
   * @param {object} payload
   * @param {object} options
   * @param {string} options.url
   * @return {Promise<{data: any, response: AxiosResponse<any>}>} data = response.data
   */
  static async create(payload, options = {}) {
    const response = await ApiService.post(`${options.url || this.tableName + '/create'}`, payload);
    return {
      response,
      data: response.data,
      [this.modelName]: response.data.data,
    };
  }

  /**
   * @param {number} id
   * @param {object} payload
   * @param {object} options
   * @param {string} options.url
   * @return {Promise<{response: AxiosResponse<any>, data: response.data}>}
   */
  static async update({ id, payload, options = {} }) {
    const response = await ApiService.put(options.url || `${this.tableName}/${id}/update`, payload);
    return {
      response: response,
      data: response.data,
    };
  }

  static delete(payload) {}
}
