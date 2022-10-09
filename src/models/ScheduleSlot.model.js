import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';
import { mergeOrCreateQuery } from '@/utils/http.util';

/**
 * @class ScheduleSlot
 * @extends CRUDModel
 */
export class ScheduleSlot extends CRUDModel {
  static modelName = 'scheduleSlot';
  /**
   * @param {object} [payload]
   * @param {Date|string} payload.start_at
   * @param {Date|string} payload.end_at
   * @param {boolean} payload.available
   */
  constructor(payload) {
    super(payload);
    this.start_at = payload?.start_at ?? null;
    this.end_at = payload?.end_at ?? null;
    this.available = payload?.available ?? null;
  }

  static async get(payload) {
    return super.find({
      _url: 'schedule/slots/byGroup',
      ...payload,
    });
  }
}
