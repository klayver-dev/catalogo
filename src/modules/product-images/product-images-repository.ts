import { prisma } from '../../lib/prisma.js';
import type { CreateProductImageData, UpdateProductImageData } from './product-images-schema.js';

export class ProductImagesRepository {
  async findProductById(productId: string) {
    return prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async create(productId: string, data: CreateProductImageData, url: string) {
    return prisma.productImage.create({
      data: {
        productId,
        url,
        alt: data.alt,
        position: data.position,
      },
    });
  }

  async findAllByProductId(productId: string) {
    return prisma.productImage.findMany({
      where: {
        productId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findByIdAndProductId(imageId: string, productId: string) {
    return prisma.productImage.findFirst({
      where: {
        id: imageId,
        productId,
      },
    });
  }

  async update(imageId: string, data: UpdateProductImageData, url?: string) {
    return prisma.productImage.update({
      where: {
        id: imageId,
      },
      data: {
        ...data,
        ...(url !== undefined && {
          url,
        }),
      },
    });
  }

  async delete(imageId: string) {
    return prisma.productImage.delete({
      where: {
        id: imageId,
      },
    });
  }
}
