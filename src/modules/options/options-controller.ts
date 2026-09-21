import type { FastifyReply } from 'fastify';

import type { CreateOptionData, UpdateOptionData } from './options-schema.js';

import type { OptionsService } from './options-service.js';

export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  async create(data: CreateOptionData, reply: FastifyReply) {
    const option = await this.optionsService.create(data);

    return reply.status(201).send({
      message: 'Opção criada com sucesso.',
      data: {
        option,
      },
    });
  }

  async findAll(reply: FastifyReply) {
    const options = await this.optionsService.findAll();

    return reply.send({
      message: 'Opções encontradas.',
      data: {
        options,
      },
    });
  }

  async findById(id: string, reply: FastifyReply) {
    const option = await this.optionsService.findById(id);

    return reply.send({
      message: 'Opção encontrada.',
      data: {
        option,
      },
    });
  }

  async update(id: string, data: UpdateOptionData, reply: FastifyReply) {
    const option = await this.optionsService.update(id, data);

    return reply.send({
      message: 'Opção atualizada com sucesso.',
      data: {
        option,
      },
    });
  }

  async delete(id: string, reply: FastifyReply) {
    await this.optionsService.delete(id);

    return reply.send({
      message: 'Opção excluída com sucesso.',
      data: null,
    });
  }
}
