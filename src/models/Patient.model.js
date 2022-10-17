import { User } from '@/models/User.model';
import { ApiService } from '@/services/api.service';
import { I18nService } from '@/services/i18n.service';
import { cyrillicToEng } from '@/utils/translit.util';

/**
 * @class Patient
 * @extends User
 */
export class Patient extends User {
  static modelName = 'patient';
  static tableName = 'patients';

  /**
   * @typedef {UserConstructorPayload|object} PatientConstructorPayload
   * @property {AmbulatoryCard} ambulatory_card
   * @property {boolean} has_treatment
   */
  /**
   * @param {PatientConstructorPayload} [payload]
   */
  constructor(payload) {
    super(payload);

    this.role = User.enum.roles.Patient;
    this.ambulatory_card = payload?.ambulatory_card || null;
    this.has_treatment = payload?.has_treatment ?? true;
    this.patient_documents = payload?.patient_documents ?? null;
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

  /**
   * Загружает картинку который приходит в res
   * @param {Object} payload
   * @return {Promise<{data: any}>}
   */
  static async upload(payload) {
    const response = await ApiService.post(`patients/${payload.patient_id}/files/attach`, {
      file_id: payload.file_id,
    });
    return {
      response: response,
      data: response.data,
      patient_documents: response.data.data,
    };
  }

  /**
   * Находит пациента по данным из браслета, которые приходят после сканирования
   * @param {string} payload
   * @return {Promise<Patient|User|object>}
   */
  static async getByBraceletPayload(payload) {
    try {
      let text = payload;
      const textOnCyrillic = payload.match(/[а-яА-Я]/gim);
      if (textOnCyrillic) text = cyrillicToEng(text);

      const url = new URL(text);
      const token = url.searchParams.get('oneTimeToken') || url.searchParams.get('onetimetoken');
      if (!token) throw new Error(I18nService.t('Base.InvalidQrCode'));

      const { data } = await ApiService.get(
        `${this.tableName}/getByOneTimeToken?oneTimeToken=${token}`
      );
      return data.data;
    } catch (err) {
      throw new Error(I18nService.t('Base.InvalidQrCode'));
    }
  }
}
