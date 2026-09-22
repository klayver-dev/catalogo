import { NotFoundError } from '../../errors/not-found-error.js';

import type {
  CreateAdditionalServiceData,
  UpdateAdditionalServiceData,
} from './additional-services-schema.js';

import type { AdditionalServicesRepository } from './additional-services-repository.js';

export class AdditionalServicesService {
  constructor(private readonly additionalServicesRepository: AdditionalServicesRepository) {}

  async create(data: CreateAdditionalServiceData) {
    return this.additionalServicesRepository.create(data);
  }

  async findAll() {
    return this.additionalServicesRepository.findAll();
  }

  async findById(id: string) {
    const additionalService = await this.additionalServicesRepository.findById(id);

    if (!additionalService) {
      throw new NotFoundError('Serviço adicional não encontrado.');
    }

    return additionalService;
  }

  async update(id: string, data: UpdateAdditionalServiceData) {
    const additionalService = await this.additionalServicesRepository.findById(id);

    if (!additionalService) {
      throw new NotFoundError('Serviço adicional não encontrado.');
    }

    return this.additionalServicesRepository.update(id, data);
  }

  async delete(id: string) {
    const additionalService = await this.additionalServicesRepository.findById(id);

    if (!additionalService) {
      throw new NotFoundError('Serviço adicional não encontrado.');
    }

    await this.additionalServicesRepository.delete(id);
  }
}
