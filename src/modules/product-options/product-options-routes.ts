import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { createProductOptionSchema, updateProductOptionSchema } from './product-options-schema.js';

import {
  createProductOptionRouteSchema,
  deleteProductOptionRouteSchema,
  findAllProductOptionsRouteSchema,
  updateProductOptionRouteSchema,
} from './product-options-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';
import type { ProductOptionsController } from './product-options-controller.js';

export class ProductOptionsRoutes {
  constructor(
    private readonly productOptionsController: ProductOptionsController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/products/:productId/options',
      {
        preHandler: authMiddleware,
        schema: createProductOptionRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        const req = createProductOptionSchema.safeParse(request.body);

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

        return this.productOptionsController.create(request.params.productId, req.data, reply);
      },
    );

    app.get(
      '/products/:productId/options',
      {
        schema: findAllProductOptionsRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        return this.productOptionsController.findAll(request.params.productId, reply);
      },
    );

    app.patch(
      '/products/:productId/options/:productOptionId',
      {
        preHandler: authMiddleware,
        schema: updateProductOptionRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            productOptionId: string;
          };
        }>,
        reply,
      ) => {
        const req = updateProductOptionSchema.safeParse(request.body);

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

        return this.productOptionsController.update(
          request.params.productId,
          request.params.productOptionId,
          req.data,
          reply,
        );
      },
    );

    app.delete(
      '/products/:productId/options/:productOptionId',
      {
        preHandler: authMiddleware,
        schema: deleteProductOptionRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            productOptionId: string;
          };
        }>,
        reply,
      ) => {
        return this.productOptionsController.delete(
          request.params.productId,
          request.params.productOptionId,
          reply,
        );
      },
    );
  }
}
