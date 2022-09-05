import { ApiService } from '@/services/api.service';

export class AmbulatoryCard {
  /**
   * @param {object} payload
   * @param {number} payload.id
   * @param {string} payload.place_residence
   * @param {string} payload.study_work
   * @param {string} payload.clinical_examination
   * @param {string} payload.place_treatment
   * @param {string} payload.blood_type_rh_factor
   * @param {string} payload.allergy
   * @param {string} payload.reaction
   * @param {string} payload.blood_transfusion
   * @param {string} payload.surgical_intervention
   * @param {string} payload.diabetes
   * @param {string} payload.infectious_diseases
   * @param {string} payload.height
   * @param {string} payload.weight
   * @param {string} payload.fluorography
   * @param {string} payload.treatment_diary
   */
  constructor(payload) {
    this.id = payload?.id ?? null;
    this.place_residence = payload?.place_residence ?? null;
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
}
