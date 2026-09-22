import type { FastifyReply } from 'fastify';

import type { CreateProductAdditionalServiceData } from './product-additional-services-schema.js';

import type { ProductAdditionalServicesService } from './product-additional-services-service.js';

export class ProductAdditionalServicesController {
  constructor(
    private readonly productAdditionalServicesService: ProductAdditionalServicesService,
  ) {}

  async create(productId: string, data: CreateProductAdditionalServiceData, reply: FastifyReply) {
    const productAdditionalService = await this.productAdditionalServicesService.create(
      productId,
      data,
    );

    return reply.status(201).send({
      message: 'Serviço adicional vinculado ao produto com sucesso.',
      data: { productAdditionalService },
    });
  }

  async findAll(productId: string, reply: FastifyReply) {
    const productAdditionalServices =
      await this.productAdditionalServicesService.findAll(productId);

    return reply.send({
      message: 'Serviços adicionais do produto encontrados.',
      data: { productAdditionalServices },
    });
  }

  async delete(productId: string, additionalServiceId: string, reply: FastifyReply) {
    await this.productAdditionalServicesService.delete(productId, additionalServiceId);

    return reply.send({
      message: 'Serviço adicional removido do produto com sucesso.',
      data: null,
    });
  }
}
