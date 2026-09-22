import type { FastifyReply } from 'fastify';
import type { CreateProductImageData, UpdateProductImageData } from './product-images-schema.js';
import type { ProductImagesService } from './product-images-service.js';

export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  async create(
    productId: string,
    data: CreateProductImageData,
    image: Buffer,
    extension: string,
    reply: FastifyReply,
  ) {
    const productImage = await this.productImagesService.create(productId, data, image, extension);

    return reply.status(201).send({
      message: 'Imagem adicionada ao produto com sucesso.',
      data: {
        productImage,
      },
    });
  }

  async findAll(productId: string, reply: FastifyReply) {
    const productImages = await this.productImagesService.findAll(productId);

    return reply.send({
      message: 'Imagens do produto encontradas.',
      data: {
        productImages,
      },
    });
  }

  async update(
    productId: string,
    imageId: string,
    data: UpdateProductImageData,
    image: Buffer | undefined,
    extension: string | undefined,
    reply: FastifyReply,
  ) {
    const productImage = await this.productImagesService.update(
      productId,
      imageId,
      data,
      image,
      extension,
    );

    return reply.send({
      message: 'Imagem do produto atualizada com sucesso.',
      data: {
        productImage,
      },
    });
  }

  async delete(productId: string, imageId: string, reply: FastifyReply) {
    await this.productImagesService.delete(productId, imageId);

    return reply.send({
      message: 'Imagem removida do produto com sucesso.',
      data: null,
    });
  }
}
