import { ApiService } from '@/services/api.service';
import { mergeOrCreateQuery } from '@/utils/http.util';
import { deleteUndefinedOrNullValueKeys } from '@/utils/object.util';

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
   * @param { "asc"|"desc" } order_direction
   * @param { string } query
   * @param { string } query_field
   * @param { string } query_type
   * @param { string } search
   * @return { Promise<AxiosResponse<any>> }
   */
  static find({ per_page, page, order_by, order_direction, query_field, query_type, search }) {
    const urlWithQuery = mergeOrCreateQuery({
      url: this.tableName,
      query: deleteUndefinedOrNullValueKeys({
        per_page,
        page,
        order_by,
        order_direction,
        query_field,
        query_type,
        search,
      }),
    });

    return ApiService.get(urlWithQuery);
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
