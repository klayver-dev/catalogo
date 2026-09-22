import { prisma } from '../../lib/prisma.js';

import type {
  CreateProductPriceTierData,
  UpdateProductPriceTierData,
} from './product-price-tiers-schema.js';

export class ProductPriceTiersRepository {
  async create(productId: string, data: CreateProductPriceTierData) {
    return prisma.productPriceTier.create({
      data: {
        productId,
        ...data,
      },
    });
  }

  async findAllByProductId(productId: string) {
    return prisma.productPriceTier.findMany({
      where: { productId },
      orderBy: { position: 'asc' },
    });
  }

  async findByIdAndProductId(priceTierId: string, productId: string) {
    return prisma.productPriceTier.findFirst({
      where: {
        id: priceTierId,
        productId,
      },
    });
  }

  async findByProductAndQuantity(productId: string, quantity: number) {
    return prisma.productPriceTier.findFirst({
      where: {
        productId,
        quantity,
      },
    });
  }

  async findProductById(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }

  async update(id: string, data: UpdateProductPriceTierData) {
    return prisma.productPriceTier.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.productPriceTier.delete({
      where: { id },
    });
  }
}
