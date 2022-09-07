import { ServiceCase } from '@/models/ServiceCase.model';

export class TreatmentServiceCase extends ServiceCase {
  constructor(payload) {
    super({ ...payload, type: ServiceCase.enum.types.Treatment });
  }

  static async findByUserId(userId, query) {
    return super.findByUserId(userId, { ...query, type: ServiceCase.enum.types.Treatment });
  }
}
