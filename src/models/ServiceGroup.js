import { CRUDModel } from '@/models/CRUD.model';

export class ServiceGroup extends CRUDModel {
  static modelName = 'groupService';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {string} payload.title
   * @param {number} payload.clinic_id
   * @param {Clinic} payload.clinic
   * @param {Array<Service>} payload.services
   */
  constructor(payload) {
    super(payload);

    this.title = payload?.title ?? null;
    this.clinic_id = payload?.clinic_id ?? null;
    this.clinic = payload?.clinic ?? null;
    this.services = payload?.services ?? null;
  }

  static async find(payload) {
    return super.find({
      _url: `services/group/list`,
      ...payload,
    });
  }
}
