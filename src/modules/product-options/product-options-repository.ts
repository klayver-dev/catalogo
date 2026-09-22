import { prisma } from '../../lib/prisma.js';
import type { CreateProductOptionData, UpdateProductOptionData } from './product-options-schema.js';

export class ProductOptionsRepository {
  async create(productId: string, data: CreateProductOptionData) {
    return prisma.productOption.create({
      data: {
        productId,
        ...data,
      },
    });
  }

  async findAllByProductId(productId: string) {
    return prisma.productOption.findMany({
      where: { productId },
    });
  }

  async findByIdAndProductId(productOptionId: string, productId: string) {
    return prisma.productOption.findFirst({
      where: {
        id: productOptionId,
        productId,
      },
    });
  }

  async findByProductAndOption(productId: string, optionId: string) {
    return prisma.productOption.findFirst({
      where: {
        productId,
        optionId,
      },
    });
  }

  async findProductById(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }

  async findOptionById(optionId: string) {
    return prisma.option.findUnique({
      where: { id: optionId },
    });
  }

  async update(id: string, data: UpdateProductOptionData) {
    return prisma.productOption.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.productOption.delete({
      where: { id },
    });
  }
}
