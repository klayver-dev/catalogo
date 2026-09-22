import type { FastifyReply } from 'fastify';

import type {
  CreateAdditionalServiceData,
  UpdateAdditionalServiceData,
} from './additional-services-schema.js';

import type { AdditionalServicesService } from './additional-services-service.js';

export class AdditionalServicesController {
  constructor(private readonly additionalServicesService: AdditionalServicesService) {}

  async create(data: CreateAdditionalServiceData, reply: FastifyReply) {
    const additionalService = await this.additionalServicesService.create(data);

    return reply.status(201).send({
      message: 'Serviço adicional criado com sucesso.',
      data: { additionalService },
    });
  }

  async findAll(reply: FastifyReply) {
    const additionalServices = await this.additionalServicesService.findAll();

    return reply.send({
      message: 'Serviços adicionais encontrados.',
      data: { additionalServices },
    });
  }

  async findById(id: string, reply: FastifyReply) {
    const additionalService = await this.additionalServicesService.findById(id);

    return reply.send({
      message: 'Serviço adicional encontrado.',
      data: { additionalService },
    });
  }

  async update(id: string, data: UpdateAdditionalServiceData, reply: FastifyReply) {
    const additionalService = await this.additionalServicesService.update(id, data);

    return reply.send({
      message: 'Serviço adicional atualizado com sucesso.',
      data: { additionalService },
    });
  }

  async delete(id: string, reply: FastifyReply) {
    await this.additionalServicesService.delete(id);

    return reply.send({
      message: 'Serviço adicional excluído com sucesso.',
      data: null,
    });
  }
}
