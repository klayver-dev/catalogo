import type { FastifyReply } from 'fastify';
import type { CreateProductData, UpdateProductData } from './products-schema.js';
import type { ProductsService } from './products-service.js';

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  async create(data: CreateProductData, reply: FastifyReply) {
    const product = await this.productsService.create(data);

    return reply.status(201).send({
      message: 'Produto criado com sucesso.',
      data: {
        product,
      },
    });
  }

  async findAll(reply: FastifyReply) {
    const products = await this.productsService.findAll();

    return reply.send({
      message: 'Produtos encontrados.',
      data: {
        products,
      },
    });
  }

  async findById(id: string, reply: FastifyReply) {
    const product = await this.productsService.findById(id);

    return reply.send({
      message: 'Produto encontrado.',
      data: {
        product,
      },
    });
  }

  async update(id: string, data: UpdateProductData, reply: FastifyReply) {
    const product = await this.productsService.update(id, data);

    return reply.send({
      message: 'Produto atualizado com sucesso.',
      data: {
        product,
      },
    });
  }

  async delete(id: string, reply: FastifyReply) {
    await this.productsService.delete(id);

    return reply.send({
      message: 'Produto excluído com sucesso.',
      data: null,
    });
  }
}
