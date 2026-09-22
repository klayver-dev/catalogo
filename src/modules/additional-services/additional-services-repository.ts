import { prisma } from '../../lib/prisma.js';

import type {
  CreateAdditionalServiceData,
  UpdateAdditionalServiceData,
} from './additional-services-schema.js';

export class AdditionalServicesRepository {
  async create(data: CreateAdditionalServiceData) {
    return prisma.additionalService.create({
      data,
    });
  }

  async findAll() {
    return prisma.additionalService.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.additionalService.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateAdditionalServiceData) {
    return prisma.additionalService.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.additionalService.delete({
      where: {
        id,
      },
    });
  }
}
