import type { FastifyReply } from 'fastify';

import type {
  CreateProductPriceTierData,
  UpdateProductPriceTierData,
} from './product-price-tiers-schema.js';

import type { ProductPriceTiersService } from './product-price-tiers-service.js';

export class ProductPriceTiersController {
  constructor(private readonly productPriceTiersService: ProductPriceTiersService) {}

  async create(productId: string, data: CreateProductPriceTierData, reply: FastifyReply) {
    const priceTier = await this.productPriceTiersService.create(productId, data);

    return reply.status(201).send({
      message: 'Faixa de preço criada com sucesso.',
      data: { priceTier },
    });
  }

  async findAll(productId: string, reply: FastifyReply) {
    const priceTiers = await this.productPriceTiersService.findAll(productId);

    return reply.send({
      message: 'Faixas de preço encontradas.',
      data: { priceTiers },
    });
  }

  async update(
    productId: string,
    priceTierId: string,
    data: UpdateProductPriceTierData,
    reply: FastifyReply,
  ) {
    const priceTier = await this.productPriceTiersService.update(productId, priceTierId, data);

    return reply.send({
      message: 'Faixa de preço atualizada com sucesso.',
      data: { priceTier },
    });
  }

  async delete(productId: string, priceTierId: string, reply: FastifyReply) {
    await this.productPriceTiersService.delete(productId, priceTierId);

    return reply.send({
      message: 'Faixa de preço excluída com sucesso.',
      data: null,
    });
  }
}
