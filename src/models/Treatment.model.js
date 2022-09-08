import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';
import { mergeOrCreateQuery } from '@/utils/http.util';
import { deleteEmptyValueKeys } from '@/utils/object.util';

export class TreatmentModel extends CRUDModel {
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

  static async getTreatments({ user_id }) {
    const response = await ApiService.get(`${this.tableName}/${user_id}`);

    return { response, data: response.data };
  }

  static async create(payload) {
    return super.create(payload, {
      url: `${this.tableName}/create`,
    });
  }
}
