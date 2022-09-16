import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Doctors
 * @extends CRUDModel
 */
export class Doctor extends CRUDModel {
  static modelName = 'doctor';
  static tableName = 'doctors';

  /**
   * @typedef {object} DoctorConstructorPayload
   * @property {string} name
   * @property {string} avatar
   * @property {Array<Specialty>} specialties
   * @property {Date|string} published_at
   */
  /** @param {DoctorConstructorPayload|object} payload */
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
