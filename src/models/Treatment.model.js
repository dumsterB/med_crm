import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

export class Treatment extends CRUDModel {
  static modelName = 'treatment';
  static tableName = 'treatments';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {number} payload.parent_id
   * @param {string} payload.birthdate
   * @param {string} payload.gender
   * @param {string} payload.created_at
   * @param {string} payload.role
   * @param {number} payload.childrens_count
   * @param {number} payload.doctor_id
   * @param {string} payload.status
   */

  constructor(payload) {
    super(payload);

    this.id = payload?.id ?? null;
    this.birthdate = payload?.birthdate ?? null;
    this.gender = payload?.gender ?? null;
    this.created_at = payload?.created_at ?? null;
    this.role = payload?.role ?? null;
    this.childrens_count = payload?.childrens_count ?? null;
    this.doctor_id = payload?.doctor_id ?? null;
    this.parent_id = payload?.parent_id ?? null;
    this.status = payload?.status ?? null;
  }

  static async findByUserId(userId) {
    const response = await ApiService.get(`${this.tableName}/${userId}`);
    return { response, data: response.data };
  }
}
