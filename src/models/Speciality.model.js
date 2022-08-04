import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Speciality
 * @extends CRUDModel
 */
export class Speciality extends CRUDModel {
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
