import { CRUDModel } from '@/models/CRUD.model';

export class DiseaseCode extends CRUDModel {
  static modelName = 'code';
  static tableName = 'codes';

  /**
   * @param {object} payload
   * @param {string} payload.code
   * @param {string} payload.title
   */
  constructor(payload) {
    super(payload);

    this.code = payload?.code ?? null;
    this.title = payload?.title ?? null;
  }
}
