import { prisma } from '../../lib/prisma.js';

import type {
  CreatePriceCombinationData,
  UpdatePriceCombinationData,
} from './price-combinations-schema.js';

export class PriceCombinationsRepository {
  async create(priceTierId: string, data: CreatePriceCombinationData) {
    return prisma.priceCombination.create({
      data: {
        priceTierId,
        priceInCents: data.priceInCents,
        options: {
          create: data.optionIds.map(optionId => ({
            optionId,
          })),
        },
      },
      include: {
        options: true,
      },
    });
  }

  async findAllByPriceTierId(priceTierId: string) {
    return prisma.priceCombination.findMany({
      where: { priceTierId },
      include: {
        options: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findByIdAndPriceTierId(combinationId: string, priceTierId: string) {
    return prisma.priceCombination.findFirst({
      where: {
        id: combinationId,
        priceTierId,
      },
      include: {
        options: true,
      },
    });
  }

  async findPriceTierById(priceTierId: string) {
    return prisma.productPriceTier.findUnique({
      where: {
        id: priceTierId,
      },
    });
  }

  async findProductOptions(productId: string, optionIds: string[]) {
    return prisma.productOption.findMany({
      where: {
        productId,
        optionId: {
          in: optionIds,
        },
      },
    });
  }

  async findExistingCombinations(priceTierId: string) {
    return prisma.priceCombination.findMany({
      where: {
        priceTierId,
      },
      include: {
        options: true,
      },
    });
  }

  async update(id: string, data: UpdatePriceCombinationData) {
    return prisma.priceCombination.update({
      where: { id },
      data,
      include: {
        options: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.priceCombination.delete({
      where: { id },
    });
  }
}
