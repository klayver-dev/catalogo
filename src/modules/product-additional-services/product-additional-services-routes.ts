import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { createProductAdditionalServiceSchema } from './product-additional-services-schema.js';

import {
  createProductAdditionalServiceRouteSchema,
  deleteProductAdditionalServiceRouteSchema,
  findAllProductAdditionalServicesRouteSchema,
} from './product-additional-services-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';

import type { ProductAdditionalServicesController } from './product-additional-services-controller.js';

export class ProductAdditionalServicesRoutes {
  constructor(
    private readonly productAdditionalServicesController: ProductAdditionalServicesController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/products/:productId/additional-services',
      {
        preHandler: authMiddleware,
        schema: createProductAdditionalServiceRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        const req = createProductAdditionalServiceSchema.safeParse(request.body);

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

        return this.productAdditionalServicesController.create(
          request.params.productId,
          req.data,
          reply,
        );
      },
    );

    app.get(
      '/products/:productId/additional-services',
      {
        schema: findAllProductAdditionalServicesRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        return this.productAdditionalServicesController.findAll(request.params.productId, reply);
      },
    );

    app.delete(
      '/products/:productId/additional-services/:additionalServiceId',
      {
        preHandler: authMiddleware,
        schema: deleteProductAdditionalServiceRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            additionalServiceId: string;
          };
        }>,
        reply,
      ) => {
        return this.productAdditionalServicesController.delete(
          request.params.productId,
          request.params.additionalServiceId,
          reply,
        );
      },
    );
  }
}
