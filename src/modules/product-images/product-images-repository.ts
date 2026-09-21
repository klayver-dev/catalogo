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

  async create(productId: string, data: CreateProductImageData) {
    return prisma.productImage.create({
      data: {
        productId,
        ...data,
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

  async update(imageId: string, productId: string, data: UpdateProductImageData) {
    return prisma.productImage.update({
      where: {
        id: imageId,
      },
      data,
    });
  }

  async delete(imageId: string, productId: string) {
    return prisma.productImage.delete({
      where: {
        id: imageId,
        productId,
      },
    });
  }
}
