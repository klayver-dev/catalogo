import type { FastifyInstance, FastifyRequest } from 'fastify';
import path from 'node:path';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { createProductImageSchema, updateProductImageSchema } from './product-images-schema.js';

import {
  createProductImageRouteSchema,
  deleteProductImageRouteSchema,
  findAllProductImagesRouteSchema,
  updateProductImageRouteSchema,
} from './product-images-swagger.js';

import type { ProductImagesController } from './product-images-controller.js';

export class ProductImagesRoutes {
  constructor(private readonly productImagesController: ProductImagesController) {}

  register(app: FastifyInstance) {
    app.post(
      '/products/:productId/images',
      {
        preHandler: authMiddleware,
        schema: createProductImageRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
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
            fields[part.fieldname] = String(part.value);
          }
        }

        if (!image || !extension) {
          return reply.status(400).send({
            message: 'A imagem do produto é obrigatória.',
            data: null,
          });
        }

        const req = createProductImageSchema.safeParse({
          alt: fields.alt,
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

        return this.productImagesController.create(
          request.params.productId,
          req.data,
          image,
          extension,
          reply,
        );
      },
    );

    app.get(
      '/products/:productId/images',
      {
        schema: findAllProductImagesRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        return this.productImagesController.findAll(request.params.productId, reply);
      },
    );

    app.patch(
      '/products/:productId/images/:imageId',
      {
        preHandler: authMiddleware,
        schema: updateProductImageRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            imageId: string;
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
            fields[part.fieldname] = String(part.value);
          }
        }

        const req = updateProductImageSchema.safeParse({
          alt: fields.alt,
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

        return this.productImagesController.update(
          request.params.productId,
          request.params.imageId,
          req.data,
          image,
          extension,
          reply,
        );
      },
    );

    app.delete(
      '/products/:productId/images/:imageId',
      {
        preHandler: authMiddleware,
        schema: deleteProductImageRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            imageId: string;
          };
        }>,
        reply,
      ) => {
        return this.productImagesController.delete(
          request.params.productId,
          request.params.imageId,
          reply,
        );
      },
    );
  }
}
