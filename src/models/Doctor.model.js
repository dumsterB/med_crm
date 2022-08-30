import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

/**
 * @class Doctors
 * @extends CRUDModel
 */
export class Doctor extends CRUDModel {
  static modelName = 'doctor';
  static tableName = 'doctors';

  /**
   *
   * @param {object} [payload]
   * @param {string} payload.name
   * @param {string} payload.avatar
   * @param {Array<Speciality>} payload.specialties
   * @param {Date|string} payload.published_at
   */
  constructor(payload) {
    super(payload);

    this.name = payload?.name || null;
    this.avatar = payload?.avatar || null;
    this.specialties = payload?.specialties || [];
    this.published_at = payload?.published_at || null;
  }

  /**
   * @param {number} id
   * @param {object} query
   * @return {Promise<{data: response.data, response: AxiosResponse<*>}>}
   */
  static async getPatients(id, query) {
    const response = await super.find({ _url: `patients/doctor/${id}`, ...query });
    return { response, data: response.data };
  }
}
