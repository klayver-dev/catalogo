import path from 'node:path';

import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { createBannerSchema, updateBannerSchema } from './banners-schema.js';

import {
  createBannerRouteSchema,
  deleteBannerRouteSchema,
  findAllBannersRouteSchema,
  findBannerByIdRouteSchema,
  updateBannerRouteSchema,
} from './banners-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';

import type { BannersController } from './banners-controller.js';

export class BannersRoutes {
  constructor(
    private readonly bannersController: BannersController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/banners',
      {
        preHandler: authMiddleware,
        schema: createBannerRouteSchema,
      },
      async (request, reply) => {
        const parts = request.parts();

        const fields: Record<string, string> = {};
        let image: Buffer | undefined;
        let extension: string | undefined;

        for await (const part of parts) {
          if (part.type === 'file') {
            if (!part.mimetype.startsWith('image/')) {
              return reply.status(400).send({
                message: 'O arquivo deve ser uma imagem.',
                data: null,
              });
            }

            image = await part.toBuffer();
            extension = path.extname(part.filename).toLowerCase();
          } else {
            fields[part.fieldname] = part.value;
          }
        }

        if (!image || !extension) {
          return reply.status(400).send({
            message: 'A imagem do banner é obrigatória.',
            data: null,
          });
        }

        const req = createBannerSchema.safeParse({
          title: fields.title,
          description: fields.description,
          link: fields.link,
          active: fields.active !== undefined ? fields.active === 'true' : undefined,
          position: fields.position !== undefined ? Number(fields.position) : undefined,
        });

        if (!req.success) {
          const errors = req.error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message,
          }));

          return reply.status(400).send({
            message: 'Dados inválidos.',
            errors,
            data: null,
          });
        }

        return this.bannersController.create(req.data, image, extension, reply);
      },
    );

    app.get(
      '/banners',
      {
        schema: findAllBannersRouteSchema,
      },
      async (_request, reply) => {
        return this.bannersController.findAll(reply);
      },
    );

    app.get(
      '/banners/:id',
      {
        schema: findBannerByIdRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.bannersController.findById(request.params.id, reply);
      },
    );

    app.patch(
      '/banners/:id',
      {
        preHandler: authMiddleware,
        schema: updateBannerRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        const parts = request.parts();

        const fields: Record<string, string> = {};
        let image: Buffer | undefined;
        let extension: string | undefined;

        for await (const part of parts) {
          if (part.type === 'file') {
            if (!part.mimetype.startsWith('image/')) {
              return reply.status(400).send({
                message: 'O arquivo deve ser uma imagem.',
                data: null,
              });
            }

            image = await part.toBuffer();
            extension = path.extname(part.filename).toLowerCase();
          } else {
            fields[part.fieldname] = part.value;
          }
        }

        const req = updateBannerSchema.safeParse({
          title: fields.title,
          description: fields.description,
          link: fields.link,
          active: fields.active !== undefined ? fields.active === 'true' : undefined,
          position: fields.position !== undefined ? Number(fields.position) : undefined,
        });

        if (!req.success) {
          const errors = req.error.issues.map(issue => ({
            field: issue.path[0],
            message: issue.message,
          }));

          return reply.status(400).send({
            message: 'Dados inválidos.',
            errors,
            data: null,
          });
        }

        return this.bannersController.update(request.params.id, req.data, image, extension, reply);
      },
    );

    app.delete(
      '/banners/:id',
      {
        preHandler: authMiddleware,
        schema: deleteBannerRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.bannersController.delete(request.params.id, reply);
      },
    );
  }
}
