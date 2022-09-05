import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

/**
 * @class InspectionCardTemplate
 * @extends CRUDModel
 */
export class InspectionCardTemplate extends CRUDModel {
  static modelName = 'template';
  static tableName = 'templates';

  /**
   * @param {[{field: string, name: string, label: *, placeholder: string, tag: string, type: string, required: boolean},{field: string, label: *, placeholder: string, tag: string, type: string},{field: string, label: *, placeholder: string, tag: string, type: string, required: boolean},{field: string, options: [{label: string, value: string},{label: string, value: string}], label: *, tag: string, placeholder: *, type: string, required: boolean},{field: string, options: [{label: string, value: string},{label: string, value: string}], label: *, placeholder: *, tag: string, type: string, required: boolean},null,null,null,null]|{template_id: (*|null)}} payload
   * @param {string} payload.title
   * @param {string} payload.complaints
   * @param {string} payload.anamnesis
   * @param {string} payload.anamnesis_life
   * @param {string} payload.operations
   * @param {string} payload.general_state
   * @param {string} payload.local_status
   * @param {string} payload.preliminary_diagnosis
   * @param {string} payload.survey_plan
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
    this.preliminary_diagnosis = payload?.preliminary_diagnosis ?? null;

    this.survey_plan = payload?.survey_plan ?? null;

    this.doctor = payload?.doctor ?? null;
  }
  static async create(payload) {
    return super.create(payload, {
      url: `${this.tableName}/create`,
    });
  }
  static async update(data, id) {
    const response = await ApiService.put(`${this.tableName}/${id}/update`, {
      ...data,
    });
    return {
      response: response,
      data: response.data,
    };
  }
  static async delete(id) {
    const response = await ApiService.delete(`${this.tableName}/${id}/delete`);
    return {
      response: response,
      data: response.data,
    };
  }
}
