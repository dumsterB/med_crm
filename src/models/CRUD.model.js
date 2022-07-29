import { ApiService } from '@/services/api.service';
import { mergeOrCreateQuery } from '@/utils/http.util';
import { deleteEmptyValueKeys } from '@/utils/object.util';
import { QUERY_ARRAY_SEPARATOR } from '@/config/api.config';

export class CRUDModel {
  static modelName = 'model';
  static tableName = 'models';

  constructor(payload) {
    this.id = payload?.id || null;
  }

  /**
   * @param { number } per_page
   * @param { number } page
   * @param { string } [order_by]
   * @param { "ASC"|"DESC" } order_direction
   * @param { string } query
   * @param { string|Array<string> } query_field
   * @param { "ILIKE"|"EQUALS"|"IN" } query_type
   * @param { "AND"|"OR" } query_operator
   * @param { string } search
   * @return { Promise<{ response: AxiosResponse<any>, data: any }> } data = response.data
   */
  static async find({
    per_page,
    page,
    order_by,
    order_direction,
    query_field,
    query_type,
    query_operator,
    search,
  }) {
    if (query_field && query_field instanceof Array) {
      query_field = query_field.join(QUERY_ARRAY_SEPARATOR);
    }

    const urlWithQuery = mergeOrCreateQuery({
      url: this.tableName,
      query: deleteEmptyValueKeys({
        per_page,
        page,
        order_by,
        order_direction,
        query_field,
        query_type,
        query_operator,
        search,
      }),
    });

    const response = await ApiService.get(urlWithQuery);
    const data = response.data;

    return { response, data };
  }

  /**
   * @param { number } id
   * @return { Promise<AxiosResponse<any>> }
   */
  static findOneById(id) {
    return ApiService.get(`${this.tableName}/${id}`);
  }

  static create(payload) {}

  static update(payload) {}

  static delete(payload) {}
}
