import { prisma } from '../../lib/prisma.js';

import type { CreateOptionData, UpdateOptionData } from './options-schema.js';

export class OptionsRepository {
  async create(data: CreateOptionData) {
    return prisma.option.create({
      data,
    });
  }

  async findAll() {
    return prisma.option.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.option.findUnique({
      where: {
        id,
      },
    });
  }

  async findOptionGroupById(id: string) {
    return prisma.optionGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateOptionData) {
    return prisma.option.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.option.delete({
      where: {
        id,
      },
    });
  }
}
