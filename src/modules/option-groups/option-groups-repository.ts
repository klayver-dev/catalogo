import { prisma } from '../../lib/prisma.js';
import type { CreateOptionGroupData, UpdateOptionGroupData } from './option-groups-schema.js';

export class OptionGroupsRepository {
  async create(data: CreateOptionGroupData) {
    return prisma.optionGroup.create({
      data,
    });
  }

  async findAll() {
    return prisma.optionGroup.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.optionGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateOptionGroupData) {
    return prisma.optionGroup.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.optionGroup.delete({
      where: {
        id,
      },
    });
  }
}
