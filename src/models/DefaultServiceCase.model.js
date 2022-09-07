import { ServiceCase } from '@/models/ServiceCase.model';

export class DefaultServiceCase extends ServiceCase {
  constructor(payload) {
    super({ ...payload, type: ServiceCase.enum.types.Default });
  }

  static async findByUserId(userId, query) {
    return super.findByUserId(userId, { ...query, type: ServiceCase.enum.types.Default });
  }
}
