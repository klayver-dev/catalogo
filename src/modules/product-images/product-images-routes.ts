import type { FastifyInstance, FastifyRequest } from 'fastify';
import { authMiddleware } from '../../middlewares/auth-middleware.js';
import type { AuthorizationService } from '../authorization/authorization-service.js';
import type { ProductImagesController } from './product-images-controller.js';
import { createProductImageSchema, updateProductImageSchema } from './product-images-schema.js';
import {
  createProductImageRouteSchema,
  deleteProductImageRouteSchema,
  findAllProductImagesRouteSchema,
  updateProductImageRouteSchema,
} from './product-images-swagger.js';

export class ProductImagesRoutes {
  constructor(
    private readonly productImagesController: ProductImagesController,
    private readonly authorizationService: AuthorizationService,
  ) {}

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
        const req = createProductImageSchema.safeParse(request.body);

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

        return this.productImagesController.create(request.params.productId, req.data, reply);
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
        const req = updateProductImageSchema.safeParse(request.body);

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
