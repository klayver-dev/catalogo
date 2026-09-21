import type { FastifyReply } from 'fastify';
import type { CreateProductImageData, UpdateProductImageData } from './product-images-schema.js';
import type { ProductImagesService } from './product-images-service.js';

export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  async create(productId: string, data: CreateProductImageData, reply: FastifyReply) {
    const image = await this.productImagesService.create(productId, data);

    return reply.status(201).send({
      message: 'Imagem adicionada com sucesso.',
      data: {
        image,
      },
    });
  }

  async findAll(productId: string, reply: FastifyReply) {
    const images = await this.productImagesService.findAll(productId);

    return reply.send({
      message: 'Imagens encontradas.',
      data: {
        images,
      },
    });
  }

  async update(
    productId: string,
    imageId: string,
    data: UpdateProductImageData,
    reply: FastifyReply,
  ) {
    const image = await this.productImagesService.update(productId, imageId, data);

    return reply.send({
      message: 'Imagem atualizada com sucesso.',
      data: {
        image,
      },
    });
  }

  async delete(productId: string, imageId: string, reply: FastifyReply) {
    await this.productImagesService.delete(productId, imageId);

    return reply.send({
      message: 'Imagem excluída com sucesso.',
      data: null,
    });
  }
}
