import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

export class Treatment extends CRUDModel {
  static modelName = 'treatment';
  static tableName = 'treatments';

  /**
   * @param {object} [payload]
   * @param {string} payload.title
   * @param {number} payload.user_id
   * @param {Patient|User} payload.user
   * @param {number} payload.price
   * @param {number} payload.duration
   * @param {DeleaseCode} payload.delease_code
   * @param {string} payload.status
   * @param {string|Date} payload.created_at
   */
  constructor(payload) {
    super(payload);

    this.title = payload?.title ?? null;
    this.user_id = payload?.user_id ?? null;
    this.user = payload?.user ?? null;
    this.price = payload?.price ?? 0;
    this.duration = payload?.duration ?? 0;
    this.delease_code = payload?.delease_code ?? null;
    this.status = payload?.status ?? null;

    this.created_at = payload?.created_at ?? null;
  }

  static async findByUserId(userId) {
    const response = await ApiService.get(`${this.tableName}/${userId}`);
    return { response, data: response.data };
  }

  static async close(id) {
    const response = await ApiService.put(`${this.tableName}/${id}/closed`);
    return { response, data: response.data };
  }
}
