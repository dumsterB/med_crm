/**
 * @class AppointmentSubject
 */
export class AppointmentSubject {
  /**
   * @param {object} [payload]
   * @param {Array<number>} payload.group_service_ids
   * @param {Array<ServiceGroup>} payload.group_services
   *
   * @param {number} payload.doctor_id
   * @param {Doctor} payload.doctor
   * @param {string} payload.start_at
   * @param {string} payload.end_at
   */
  constructor(payload) {
    this.group_service_ids = payload?.group_service_ids ?? [];
    this.group_services = payload?.group_services ?? [];

    this.doctor_id = payload?.doctor_id ?? null;
    this.doctor = payload?.doctor ?? null;
    this.start_at = payload?.start_at ?? null;
    this.end_at = payload?.end_at ?? null;
  }
}
