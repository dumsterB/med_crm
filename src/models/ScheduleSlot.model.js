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

  /**
   * @param {number} serviceId
   * @param {Date|string} from
   * @param {Date|string} to
   * @return {Promise<{response: AxiosResponse<*>, data: response.data}>}
   */
  static async getSlotsByServiceId({ serviceId, from, to }) {
    const urlWithQuery = mergeOrCreateQuery({
      url: 'schedule/slots',
      query: {
        service_id: serviceId,
        from,
        to,
      },
    });

    const response = await ApiService.get(urlWithQuery);
    return { response, data: response.data };
  }

  /**
   * @param {number} groupServiceId
   * @param {Date|string} from
   * @param {Date|string} to
   * @return {Promise<{response: AxiosResponse<*>, data: response.data}>}
   */
  static async getSlotsByGroupServiceId({ groupServiceId, from, to }) {
    const urlWithQuery = mergeOrCreateQuery({
      url: 'schedule/slots',
      query: {
        group_service_id: groupServiceId,
        from,
        to,
      },
    });

    const response = await ApiService.get(urlWithQuery);
    return { response, data: response.data };
  }
}
