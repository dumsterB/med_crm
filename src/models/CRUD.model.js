import { ApiService } from '@/services/api.service';
import { mergeOrCreateQuery } from '@/utils/http.util';
import { deleteUndefinedOrNullValueKeys } from '@/utils/object.util';

export class CRUDModel {
  static modelName = 'model';
  static tableName = 'models';
  constructor(payload) {
    this.id = payload?.id || null;
  }

  // TODO: реализовать поиск по query
  /**
   * @param { number } perPage
   * @param { number } page
   * @param { string } [orderBy]
   * @param { "asc"|"desc" } orderDirection
   * @param { object } query
   * @param { string } query.default search by all fields
   * @param { string } query./a-zA-Z/
   * @return { Promise<AxiosResponse<any>> }
   */
  static find({ perPage, page, orderBy, orderDirection }) {
    const urlWithQuery = mergeOrCreateQuery({
      url: this.tableName,
      query: deleteUndefinedOrNullValueKeys({
        perPage,
        page,
        orderBy,
        orderDirection,
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
