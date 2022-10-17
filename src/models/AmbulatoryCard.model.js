import { ApiService } from '@/services/api.service';

export class AmbulatoryCard {
  /**
   * @typedef {object} AmbulatoryCardConstructorPayload
   * @property {number} id
   * @property {string} place_residence
   * @property {string} place_treatment
   * @property {string} study_work
   * @property {string} clinical_examination
   * @property {string} place_treatment
   * @property {string} blood_type_rh_factor
   * @property {string} allergy
   * @property {string} reaction
   * @property {string} blood_transfusion
   * @property {string} surgical_intervention
   * @property {string} diabetes
   * @property {string} infectious_diseases
   * @property {string} height
   * @property {string} weight
   * @property {string} fluorography
   * @property {string} treatment_diary
   */
  /** @param {AmbulatoryCardConstructorPayload} [payload]  */
  constructor(payload) {
    this.id = payload?.id ?? null;
    this.place_residence = payload?.place_residence ?? null;
    this.place_treatment = payload?.place_treatment ?? null;
    this.study_work = payload?.study_work ?? null;
    this.clinical_examination = payload?.clinical_examination ?? null;
    this.blood_type_rh_factor = payload?.blood_type_rh_factor ?? null;
    this.allergy = payload?.allergy ?? null;
    this.reaction = payload?.reaction ?? null;
    this.blood_transfusion = payload?.blood_transfusion ?? null;
    this.surgical_intervention = payload?.surgical_intervention ?? null;
    this.diabetes = payload?.diabetes ?? null;
    this.infectious_diseases = payload?.infectious_diseases ?? null;
    this.height = payload?.height ?? null;
    this.weight = payload?.weight ?? null;
    this.fluorography = payload?.fluorography ?? null;
    this.treatment_diary = payload?.treatment_diary ?? null;
    this.patient_document = payload?.patient_document ?? null;
  }

  /**
   * @param {number} patientId
   * @param {object} payload
   * @return {Promise<{data: response.data, response: AxiosResponse<any>}>}
   */
  static async save(patientId, payload) {
    const response = await ApiService.put(`/patients/${patientId}/card`, payload);
    return { response, data: response.data };
  }

  static async upload(patientId, payload) {
    const response = await ApiService.post(`files/create`, {
      patientId: patientId,
      files: payload,
    });
    return { response, data: response.data };
  }
}
