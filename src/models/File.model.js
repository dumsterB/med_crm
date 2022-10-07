import { CRUDModel } from '@/models/CRUD.model';
import { ApiService } from '@/services/api.service';

export class File extends CRUDModel {
  static modelName = 'file';
  static tableName = 'files';

  /**
   * @param {object} payload
   * @param {number} payload.id
   * @param {string} payload.link
   * @param {string} payload.name
   * @param {number} payload.size
   */
  constructor(payload) {
    super(payload);

    this.link = payload.link;
    this.name = payload.name ?? null;
    this.size = payload?.size ?? 0;
  }

  /**
   * @override
   * @param {UploadFile|object} file
   * @return {Promise<void>}
   */
  static async create(file) {
    const formData = new FormData();
    formData.append('file', file.raw);

    const response = await ApiService.post(`${this.tableName}/create`, formData);
    return {
      response: response,
      data: response.data,
    };
  }
}
