import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Doctors
 * @extends CRUDModel
 */
export class Doctors extends CRUDModel {
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
}
