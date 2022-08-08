import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

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

  /**
   * @param {number} serviceId
   * @param {Date|string} from
   * @param {Date|string} to
   * @return {Promise<{response: AxiosResponse<*>, data: response.data}>}
   */
  static async getSlotsByServiceId({ serviceId, from, to }) {
    return super.find({
      _url: 'schedule/slots',
      service_id: serviceId,
      from,
      to,
    });
  }

  /**
   * @param {number} groupServiceId
   * @param {Date|string} from
   * @param {Date|string} to
   * @return {Promise<{response: AxiosResponse<*>, data: response.data}>}
   */
  static async getSlotsByGroupServiceId({ groupServiceId, from, to }) {
    return super.find({
      _url: 'schedule/slots/byGroup',
      group_service_id: groupServiceId,
      from,
      to,
    });
  }
}
