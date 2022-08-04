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
    this.childrens_count = payload?.childrens_count ?? 0;
    this.childrens = payload?.childrens ?? [];
    this.parent_id = payload?.parent_id ?? null;
    this.parent = payload?.parent ?? null;
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
   * @param {...Patient, code: string} payload
   * @return {Promise<{data: any, response: AxiosResponse<any>}>}
   */
  static async rebindingPhone(payload) {
    const response = await ApiService.post(`${this.tableName}/phone/rebinding`, payload);
    return {
      response: response,
      data: response.data,
    };
  }
}
