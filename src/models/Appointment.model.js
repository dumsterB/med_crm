import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class Appointment
 * @extends CRUDModel
 */
export class Appointment extends CRUDModel {
  static modelName = 'appointment';
  static tableName = 'appointments';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {number} payload.doctor_id
   * @param {number} payload.user_id
   * @param {number} payload.patient_id synonym for payload.user_id
   * @param {Date|string} payload.start_at
   * @param {Date|string} payload.end_at
   * @param {string} payload.status
   * @param {string} payload.cancel_reason
   * @param {string} payload.cancel_description
   */
  constructor(payload) {
    super(payload);

    this.doctor_id = payload?.doctor_id ?? null;
    this.user_id = payload?.user_id ?? payload?.patient_id ?? null;
    this.start_at = payload?.start_at ?? null;
    this.end_at = payload?.end_at ?? null;
    this.status = payload?.status ?? null;
    this.cancel_reason = payload?.cancel_reason ?? null;
    this.cancel_description = payload?.cancel_description ?? null;
  }
}
