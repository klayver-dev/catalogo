import { prisma } from '../../lib/prisma.js';
import type { CreateProductData, UpdateProductData } from './products-schema.js';

export class ProductsRepository {
  async create(data: CreateProductData) {
    return prisma.product.create({
      data,
    });
  }

  async findAll() {
    return prisma.product.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: {
        slug,
      },
    });
  }

  async findBySku(sku: string) {
    return prisma.product.findUnique({
      where: {
        sku,
      },
    });
  }

  async findCategoryById(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateProductData) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
