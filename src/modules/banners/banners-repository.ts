import { prisma } from '../../lib/prisma.js';

import type { CreateBannerData, UpdateBannerData } from './banners-schema.js';

export class BannersRepository {
  async create(data: CreateBannerData, imageUrl: string) {
    return prisma.banner.create({
      data: {
        ...data,
        imageUrl,
      },
    });
  }

  async findAll() {
    return prisma.banner.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.banner.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateBannerData, imageUrl?: string) {
    return prisma.banner.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(imageUrl !== undefined && {
          imageUrl,
        }),
      },
    });
  }

  async delete(id: string) {
    return prisma.banner.delete({
      where: {
        id,
      },
    });
  }
}
