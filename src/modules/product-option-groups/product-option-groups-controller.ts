import type { FastifyReply } from 'fastify';

import type {
  CreateProductOptionGroupData,
  UpdateProductOptionGroupData,
} from './product-option-groups-schema.js';

import type { ProductOptionGroupsService } from './product-option-groups-service.js';

export class ProductOptionGroupsController {
  constructor(private readonly productOptionGroupsService: ProductOptionGroupsService) {}

  async create(productId: string, data: CreateProductOptionGroupData, reply: FastifyReply) {
    const productOptionGroup = await this.productOptionGroupsService.create(productId, data);

    return reply.status(201).send({
      message: 'Grupo de opções vinculado ao produto com sucesso.',
      data: {
        productOptionGroup,
      },
    });
  }

  async findAll(productId: string, reply: FastifyReply) {
    const productOptionGroups = await this.productOptionGroupsService.findAll(productId);

    return reply.send({
      message: 'Grupos de opções do produto encontrados.',
      data: {
        productOptionGroups,
      },
    });
  }

  async update(
    productId: string,
    productOptionGroupId: string,
    data: UpdateProductOptionGroupData,
    reply: FastifyReply,
  ) {
    const productOptionGroup = await this.productOptionGroupsService.update(
      productId,
      productOptionGroupId,
      data,
    );

    return reply.send({
      message: 'Grupo de opções do produto atualizado com sucesso.',
      data: {
        productOptionGroup,
      },
    });
  }

  async delete(productId: string, productOptionGroupId: string, reply: FastifyReply) {
    await this.productOptionGroupsService.delete(productId, productOptionGroupId);

    return reply.send({
      message: 'Grupo de opções removido do produto com sucesso.',
      data: null,
    });
  }
}
