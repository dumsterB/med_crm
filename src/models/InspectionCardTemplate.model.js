import { CRUDModel } from '@/models/CRUD.model';

/**
 * @class InspectionCardTemplate
 * @extends CRUDModel
 */
export class InspectionCardTemplate extends CRUDModel {
  static modelName = 'template';
  static tableName = 'templates';

  /**
   * @param {object} payload
   * @param {string} payload.title
   * @param {string} payload.complaints
   * @param {string} payload.anamnesis
   * @param {string} payload.anamnesis_life
   * @param {string} payload.operations
   * @param {string} payload.general_state
   * @param {string} payload.local_status
   * @param {string} payload.preliminaray_diagnosys
   * @param {string} payload.survey_plan
   * @param {number} payload.doctor_id
   * @param {Doctor} payload.doctor
   */
  constructor(payload) {
    super(payload);

    this.title = payload?.title ?? '';
    this.complaints = payload?.complaints ?? null;
    this.anamnesis = payload?.anamnesis ?? null;
    this.anamnesis_life = payload?.anamnesis_life ?? null;
    this.operations = payload?.operations ?? null;
    this.general_state = payload?.general_state ?? null;
    this.local_status = payload?.local_status ?? null;
    this.preliminaray_diagnosys = payload?.preliminaray_diagnosys ?? null;
    this.survey_plan = payload?.survey_plan ?? null;

    this.doctor_id = payload?.doctor_id ?? null;
    this.doctor = payload?.doctor ?? null;
  }
}
