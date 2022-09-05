import { User } from '@/models/User.model';
import { ApiService } from '@/services/api.service';

/**
 * @class Patient
 * @extends CRUDModel
 */
export class Patient extends User {
  static modelName = 'patient';
  static tableName = 'patients';

  /**
   * @param {object} [payload]
   * @param {number} payload.id
   * @param {number} payload.childrens_count
   * @param {Array<User|Patient>} payload.childrens
   * @param {number} payload.parent_id
   * @param {User|Patient} payload.parent
   */
  constructor(payload) {
    super(payload);
    this.role = User.enum.roles.Patient;
  }

  static async create(payload) {
    const url = payload?.parent_id ? `${this.tableName}/child` : null;
    return super.create(payload, { url });
  }

  /**
   * Проверяет существование пациента
   * @param {string} phone
   * @return {Promise<|{data: any, response: AxiosResponse<any>, patient: Patient, attach_clinic: boolean}>}
   */
  static async checkPatient({ phone }) {
    try {
      const response = await ApiService.post(`${this.tableName}/check`, { phone });
      return {
        response: response,
        data: response.data,
        patient: response.data.data.user,
        attach_clinic: response.data.data.attach_clinic,
      };
    } catch (err) {
      if (err.response?.status !== 404) throw new Error(err);

      return {
        response: null,
        data: null,
        patient: null,
        attach_clinic: false,
      };
    }
  }

  /**
   * Привязка пациента к нашей клинике
   * @param {string} patient_id
   * @return {Promise<{data: any, response: AxiosResponse<any>, patient: Patient}>}
   */
  static async attachPatient({ patient_id }) {
    const response = await ApiService.post(`${this.tableName}/${patient_id}/attach`);
    return {
      response: response,
      data: response.data,
      patient: response.data.data,
    };
  }

  /**
   * @param {string} phone
   * @return {Promise<{response: AxiosResponse<any>, data: response.data}>}
   */
  static async sendCodeOnPhone({ phone }) {
    const response = await ApiService.post(`${this.tableName}/phone/code`, { phone: phone });
    return { response: response, data: response.data };
  }

  /**
   * @param {string} phone
   * @param {string} code
   * @return {Promise<{data: response.data, response: AxiosResponse<any>}>}
   */
  static async checkCodeFromPhone({ phone, code }) {
    const response = await ApiService.post(`${this.tableName}/phone/code/check`, { phone, code });
    return { response, data: response.data };
  }

  /**
   * @param {Patient} patient
   * @param {string} code
   * @return {Promise<{data: any, response: AxiosResponse<any>}>}
   */
  static async rebinding({ patient, code }) {
    const response = await ApiService.post(`${this.tableName}/phone/rebinding`, {
      code,
      ...patient,
    });
    return {
      response: response,
      data: response.data,
      patient: response.data.data,
    };
  }
}
