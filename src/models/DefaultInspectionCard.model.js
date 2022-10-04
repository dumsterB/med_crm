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
  }
}
