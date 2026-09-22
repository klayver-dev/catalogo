import type { FastifyReply } from 'fastify';

import type { CreateBannerData, UpdateBannerData } from './banners-schema.js';

import type { BannersService } from './banners-service.js';

export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  async create(data: CreateBannerData, image: Buffer, extension: string, reply: FastifyReply) {
    const banner = await this.bannersService.create(data, image, extension);

    return reply.status(201).send({
      message: 'Banner criado com sucesso.',
      data: { banner },
    });
  }

  async findAll(reply: FastifyReply) {
    const banners = await this.bannersService.findAll();

    return reply.send({
      message: 'Banners encontrados.',
      data: { banners },
    });
  }

  async findById(id: string, reply: FastifyReply) {
    const banner = await this.bannersService.findById(id);

    return reply.send({
      message: 'Banner encontrado.',
      data: { banner },
    });
  }

  async update(
    id: string,
    data: UpdateBannerData,
    image: Buffer | undefined,
    extension: string | undefined,
    reply: FastifyReply,
  ) {
    const banner = await this.bannersService.update(id, data, image, extension);

    return reply.send({
      message: 'Banner atualizado com sucesso.',
      data: { banner },
    });
  }

  async delete(id: string, reply: FastifyReply) {
    await this.bannersService.delete(id);

    return reply.send({
      message: 'Banner excluído com sucesso.',
      data: null,
    });
  }
}
