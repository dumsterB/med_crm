import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

export class File extends CRUDModel {
  static modelName = 'file';
  static tableName = 'files';

  /**
   * @param {object} payload
   * @param {number} payload.id
   * @param {string} payload.link
   * @param {string} payload.filename
   * @param {string} payload.name synonym for filename
   * @param {number} payload.size
   */
  constructor(payload) {
    super(payload);

    this.link = payload.link;
    this.filename = payload?.filename ?? payload?.name ?? null;
    this.name = payload?.name ?? payload?.filename ?? null;
    this.size = payload?.size ?? 0;
  }

  /**
   * @override
   * @param {UploadFile|object} file
   * @return {Promise<void>}
   */
  static async create(file) {
    const formData = new FormData();
    formData.append('files', file.raw);

    const response = await ApiService.post(`${this.tableName}/create`, formData);
    return {
      response: response,
      data: response.data,
    };
  }
}
