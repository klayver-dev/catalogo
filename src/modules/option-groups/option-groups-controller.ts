import type { FastifyReply } from 'fastify';
import type { CreateOptionGroupData, UpdateOptionGroupData } from './option-groups-schema.js';
import type { OptionGroupsService } from './option-groups-service.js';

export class OptionGroupsController {
  constructor(private readonly optionGroupsService: OptionGroupsService) {}

  async create(data: CreateOptionGroupData, reply: FastifyReply) {
    const optionGroup = await this.optionGroupsService.create(data);

    return reply.status(201).send({
      message: 'Grupo de opções criado com sucesso.',
      data: {
        optionGroup,
      },
    });
  }

  async findAll(reply: FastifyReply) {
    const optionGroups = await this.optionGroupsService.findAll();

    return reply.send({
      message: 'Grupos de opções encontrados.',
      data: {
        optionGroups,
      },
    });
  }

  async findById(id: string, reply: FastifyReply) {
    const optionGroup = await this.optionGroupsService.findById(id);

    return reply.send({
      message: 'Grupo de opções encontrado.',
      data: {
        optionGroup,
      },
    });
  }

  async update(id: string, data: UpdateOptionGroupData, reply: FastifyReply) {
    const optionGroup = await this.optionGroupsService.update(id, data);

    return reply.send({
      message: 'Grupo de opções atualizado com sucesso.',
      data: {
        optionGroup,
      },
    });
  }

  async delete(id: string, reply: FastifyReply) {
    await this.optionGroupsService.delete(id);

    return reply.send({
      message: 'Grupo de opções excluído com sucesso.',
      data: null,
    });
  }
}
