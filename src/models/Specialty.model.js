import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Specialty
 * @extends CRUDModel
 */
export class Specialty extends CRUDModel {
  static modelName = 'specialty';
  static tableName = 'specialties';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {string} payload.title
   */
  constructor(payload) {
    super(payload);
    this.title = payload?.title || null;
  }
}
