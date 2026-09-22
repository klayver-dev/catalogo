import { prisma } from '../../lib/prisma.js';

import type {
  CreateProductOptionGroupData,
  UpdateProductOptionGroupData,
} from './product-option-groups-schema.js';

export class ProductOptionGroupsRepository {
  async create(productId: string, data: CreateProductOptionGroupData) {
    return prisma.productOptionGroup.create({
      data: {
        productId,
        ...data,
      },
    });
  }

  async findAllByProductId(productId: string) {
    return prisma.productOptionGroup.findMany({
      where: {
        productId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findByIdAndProductId(productOptionGroupId: string, productId: string) {
    return prisma.productOptionGroup.findFirst({
      where: {
        id: productOptionGroupId,
        productId,
      },
    });
  }

  async findByProductAndOptionGroup(productId: string, optionGroupId: string) {
    return prisma.productOptionGroup.findFirst({
      where: {
        productId,
        optionGroupId,
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

  async findOptionGroupById(optionGroupId: string) {
    return prisma.optionGroup.findUnique({
      where: {
        id: optionGroupId,
      },
    });
  }

  async update(id: string, data: UpdateProductOptionGroupData) {
    return prisma.productOptionGroup.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.productOptionGroup.delete({
      where: {
        id,
      },
    });
  }
}
