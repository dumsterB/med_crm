import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Service
 * @extends CRUDModel
 */
export class Service extends CRUDModel {
  static modelName = 'service';
  static tableName = 'services';

  /**
   *
   * @param {object} [payload]
   * @param {number} payload.price
   * @param {string} payload.title
   * @param {string} payload.description
   * @param {String<Service.enum.types>} payload.type
   * @param {number} payload.category_id
   * @param {ServiceCategory|object} payload.category
   * @param {number} payload.doctor_id
   * @param {Doctor} payload.doctor
   */
  constructor(payload) {
    super(payload);

    this.price = payload?.price ?? null;
    this.title = payload?.title ?? '';
    this.description = payload?.description ?? null;
    this.type = payload?.type ?? null;
    this.category_id = payload?.category_id ?? null;
    this.category = payload?.category ?? null;
    this.doctor_id = payload?.doctor_id ?? null;
    this.doctor = payload?.doctor ?? null;
  }

  static enum = {
    types: {
      Analysis: 'analysis',
      Cosmetology: 'cosmetology',
      Procedure: 'procedure',
      Vaccine: 'vaccine',
      Service: 'service',
    },
  };

  /**
   * @param {object} payload CRUDModel.find.params + doctorId
   * @return {Promise<{response: AxiosResponse<*>, data: response.data}>}
   */
  static async find(payload) {
    const url = payload.doctorId
      ? `${this.tableName}/${payload.doctorId}`
      : `${this.tableName}/group/list`;

    return super.find({
      _url: url,
      ...payload,
    });
  }
}
