import type { FastifyReply } from 'fastify';
import type { CreateProductOptionData, UpdateProductOptionData } from './product-options-schema.js';
import type { ProductOptionsService } from './product-options-service.js';

export class ProductOptionsController {
  constructor(private readonly productOptionsService: ProductOptionsService) {}

  async create(productId: string, data: CreateProductOptionData, reply: FastifyReply) {
    const productOption = await this.productOptionsService.create(productId, data);

    return reply.status(201).send({
      message: 'Opção vinculada ao produto com sucesso.',
      data: { productOption },
    });
  }

  async findAll(productId: string, reply: FastifyReply) {
    const productOptions = await this.productOptionsService.findAll(productId);

    return reply.send({
      message: 'Opções do produto encontradas.',
      data: { productOptions },
    });
  }

  async update(
    productId: string,
    productOptionId: string,
    data: UpdateProductOptionData,
    reply: FastifyReply,
  ) {
    const productOption = await this.productOptionsService.update(productId, productOptionId, data);

    return reply.send({
      message: 'Opção do produto atualizada com sucesso.',
      data: { productOption },
    });
  }

  async delete(productId: string, productOptionId: string, reply: FastifyReply) {
    await this.productOptionsService.delete(productId, productOptionId);

    return reply.send({
      message: 'Opção removida do produto com sucesso.',
      data: null,
    });
  }
}
