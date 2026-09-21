import { prisma } from '../../lib/prisma.js';

import type { CreateCategoryData, UpdateCategoryData } from './categories-schema.js';

export class CategoriesRepository {
  async create(data: CreateCategoryData) {
    return prisma.category.create({
      data,
    });
  }

  async findAll() {
    return prisma.category.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: {
        slug,
      },
    });
  }

  async update(id: string, data: UpdateCategoryData) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
