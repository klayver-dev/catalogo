import type { FastifyReply } from 'fastify';

import type {
  CreatePriceCombinationData,
  UpdatePriceCombinationData,
} from './price-combinations-schema.js';

import type { PriceCombinationsService } from './price-combinations-service.js';

export class PriceCombinationsController {
  constructor(private readonly priceCombinationsService: PriceCombinationsService) {}

  async create(priceTierId: string, data: CreatePriceCombinationData, reply: FastifyReply) {
    const combination = await this.priceCombinationsService.create(priceTierId, data);

    return reply.status(201).send({
      message: 'Combinação de preço criada com sucesso.',
      data: { combination },
    });
  }

  async findAll(priceTierId: string, reply: FastifyReply) {
    const combinations = await this.priceCombinationsService.findAll(priceTierId);

    return reply.send({
      message: 'Combinações de preço encontradas.',
      data: { combinations },
    });
  }

  async update(
    priceTierId: string,
    combinationId: string,
    data: UpdatePriceCombinationData,
    reply: FastifyReply,
  ) {
    const combination = await this.priceCombinationsService.update(
      priceTierId,
      combinationId,
      data,
    );

    return reply.send({
      message: 'Combinação de preço atualizada com sucesso.',
      data: { combination },
    });
  }

  async delete(priceTierId: string, combinationId: string, reply: FastifyReply) {
    await this.priceCombinationsService.delete(priceTierId, combinationId);

    return reply.send({
      message: 'Combinação de preço excluída com sucesso.',
      data: null,
    });
  }
}
