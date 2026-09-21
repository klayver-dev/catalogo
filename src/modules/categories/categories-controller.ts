import type { FastifyReply } from 'fastify';

import type { CreateCategoryData, UpdateCategoryData } from './categories-schema.js';

import type { CategoriesService } from './categories-service.js';

export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  async create(data: CreateCategoryData, reply: FastifyReply) {
    const category = await this.categoriesService.create(data);

    return reply.status(201).send({
      message: 'Categoria criada com sucesso.',
      data: {
        category,
      },
    });
  }

  async findAll(reply: FastifyReply) {
    const categories = await this.categoriesService.findAll();

    return reply.send({
      message: 'Categorias encontradas.',
      data: {
        categories,
      },
    });
  }

  async findById(id: string, reply: FastifyReply) {
    const category = await this.categoriesService.findById(id);

    return reply.send({
      message: 'Categoria encontrada.',
      data: {
        category,
      },
    });
  }

  async update(id: string, data: UpdateCategoryData, reply: FastifyReply) {
    const category = await this.categoriesService.update(id, data);

    return reply.send({
      message: 'Categoria atualizada com sucesso.',
      data: {
        category,
      },
    });
  }

  async delete(id: string, reply: FastifyReply) {
    await this.categoriesService.delete(id);

    return reply.send({
      message: 'Categoria excluída com sucesso.',
      data: null,
    });
  }
}
