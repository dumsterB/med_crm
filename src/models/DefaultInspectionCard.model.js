import { InspectionCard } from '@/models/InspectionCard.model';

/**
 * @class DefaultInspectionCard
 * @extends InspectionCard
 */
export class DefaultInspectionCard extends InspectionCard {
  /**
   * @typedef {InspectionCardConstructorPayload|object} DefaultInspectionCardConstructorPayload
   * @property {string} complaints
   * @property {string} anamnesis
   * @property {string} anamnesis_life
   * @property {string} operations
   * @property {string} general_state
   * @property {string} local_status
   * @property {string} preliminary_diagnosis
   * @property {string} survey_plan
   * @property {string} recommendations
   */
  /** @param {DefaultInspectionCardConstructorPayload} [payload] */
  constructor(payload) {
    super({ ...payload, type: InspectionCard.enum.types.Default });

    this.complaints = payload?.complaints ?? null;
    this.anamnesis = payload?.anamnesis ?? null;
    this.anamnesis_life = payload?.anamnesis_life ?? null;
    this.operations = payload?.operations ?? null;
    this.general_state = payload?.general_state ?? null;
    this.local_status = payload?.local_status ?? null;
    this.preliminary_diagnosis = payload?.preliminary_diagnosis ?? null;
    this.survey_plan = payload?.survey_plan ?? null;
    this.recommendations = payload?.recommendations ?? null;
  }
}
