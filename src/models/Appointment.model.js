import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';
import { mergeOrCreateQuery } from '@/utils/http.util';
import { deleteEmptyValueKeys } from '@/utils/object.util';

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
   * @param {number} payload.patient_id
   * @param {Patient} payload.patient
   * @param {number} payload.doctor_id
   * @param {Doctor} payload.doctor
   * @param {number} payload.specialty_id
   * @param {Specialty} payload.specialty
   * @param {number} payload.service_id
   * @param {Service} payload.service
   * @param {number} payload.group_service_id
   * @param {ServiceGroup} payload.group_service
   * @param {number} payload.user_id synonym for payload.patient_id
   * @param {Date|string} payload.start_at - format DD.MM.YY hh:mm
   * @param {Date|string} payload.end_at
   * @param {string} payload.status
   * @param {string} payload.cancel_reason
   * @param {string} payload.cancel_description
   */
  constructor(payload) {
    super(payload);

    this.patient_id = payload?.patient_id ?? payload?.user_id ?? null;
    this.patient = payload?.patient ?? null;
    this.doctor_id = payload?.doctor_id ?? null;
    this.doctor = payload?.doctor ?? null;
    this.specialty_id = payload?.specialty_id ?? null;
    this.specialty = payload?.specialty ?? null;
    this.service_id = payload?.service_id ?? null;
    this.service = payload?.service ?? null;
    this.group_service_id = payload?.group_service_id ?? null;
    this.group_service = payload?.group_service ?? null;
    this.start_at = payload?.start_at ?? null;
    this.end_at = payload?.end_at ?? null;
    this.status = payload?.status ?? null;
    this.cancel_reason = payload?.cancel_reason ?? null;
    this.cancel_description = payload?.cancel_description ?? null;
  }

  /**
   * @param {object} payload
   * @return {Promise<{data: response.data, response: AxiosResponse<*>}>}
   */
  static async create(payload) {
    return super.create(payload, {
      url: !payload.service_id ? `${this.tableName}/create/byGroup` : null,
    });
  }

  static async getStatistic({ startAt, endAt, doctorsId }) {
    const response = await ApiService.get(
      mergeOrCreateQuery({
        url: `/${this.tableName}/month`,
        query: deleteEmptyValueKeys({ start_at: startAt, end_at: endAt, doctors_id: doctorsId }),
      })
    );

    return { response, data: response.data };
  }

  /**
   * @param {string,number} doctorId
   * @return {Promise<{data: response.data, response: AxiosResponse<*>}>}
   */
  static async findByDoctor({ doctorId }) {
    const response = await ApiService.get(`${this.tableName}/${doctorId}/queues`);
    return { response, data: response.data };
  }

  /**
   * @param {string,number} id
   * @param {string} status
   * @return {Promise<{data: response.data, response: AxiosResponse<*>}>}
   */
  static async updateStatus({ id, status }) {
    const response = await ApiService.put(`${this.tableName}/${id}/${status}`);
    return {
      response: response,
      data: response.data,
    };
  }

  /**
   * @param {string} date format - DD.MM.YY hh:mm
   * @return {Date|string}
   */
  static getStartDate(date) {
    return date.split(' ')[0];
  }

  /**
   * @param {string} date format - DD.MM.YY hh:mm
   * @return {Date|string}
   */
  static getStartTime(date) {
    return date.split(' ')[1];
  }

  static enum = {
    types: {
      Doctor: 'doctor',
      Service: 'service',
    },
    statuses: {
      Created: 'created',
      Approved: 'approve',
      Waiting: 'waiting',
      InProgress: 'inProgress',
      Provided: 'provided',
      Canceled: 'cancel',
    },
  };
}
