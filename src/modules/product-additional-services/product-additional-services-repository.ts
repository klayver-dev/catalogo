import { prisma } from '../../lib/prisma.js';

import type { CreateProductAdditionalServiceData } from './product-additional-services-schema.js';

export class ProductAdditionalServicesRepository {
  async create(productId: string, data: CreateProductAdditionalServiceData) {
    return prisma.productAdditionalService.create({
      data: {
        productId,
        additionalServiceId: data.additionalServiceId,
      },
    });
  }

  async findAllByProductId(productId: string) {
    return prisma.productAdditionalService.findMany({
      where: {
        productId,
      },
      include: {
        additionalService: true,
      },
    });
  }

  async findByProductAndAdditionalService(productId: string, additionalServiceId: string) {
    return prisma.productAdditionalService.findFirst({
      where: {
        productId,
        additionalServiceId,
      },
    });
  }

  async findProductById(productId: string) {
    return prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async findAdditionalServiceById(additionalServiceId: string) {
    return prisma.additionalService.findUnique({
      where: {
        id: additionalServiceId,
      },
    });
  }

  async delete(productId: string, additionalServiceId: string) {
    return prisma.productAdditionalService.delete({
      where: {
        productId_additionalServiceId: {
          productId,
          additionalServiceId,
        },
      },
    });
  }
}
