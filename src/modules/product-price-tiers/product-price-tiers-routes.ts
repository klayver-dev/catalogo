import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import {
  createProductPriceTierSchema,
  updateProductPriceTierSchema,
} from './product-price-tiers-schema.js';

import {
  createProductPriceTierRouteSchema,
  deleteProductPriceTierRouteSchema,
  findAllProductPriceTiersRouteSchema,
  updateProductPriceTierRouteSchema,
} from './product-price-tiers-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';

import type { ProductPriceTiersController } from './product-price-tiers-controller.js';

export class ProductPriceTiersRoutes {
  constructor(
    private readonly productPriceTiersController: ProductPriceTiersController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/products/:productId/price-tiers',
      {
        preHandler: authMiddleware,
        schema: createProductPriceTierRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        const req = createProductPriceTierSchema.safeParse(request.body);

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

        return this.productPriceTiersController.create(request.params.productId, req.data, reply);
      },
    );

    app.get(
      '/products/:productId/price-tiers',
      {
        schema: findAllProductPriceTiersRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        return this.productPriceTiersController.findAll(request.params.productId, reply);
      },
    );

    app.patch(
      '/products/:productId/price-tiers/:priceTierId',
      {
        preHandler: authMiddleware,
        schema: updateProductPriceTierRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            priceTierId: string;
          };
        }>,
        reply,
      ) => {
        const req = updateProductPriceTierSchema.safeParse(request.body);

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

        return this.productPriceTiersController.update(
          request.params.productId,
          request.params.priceTierId,
          req.data,
          reply,
        );
      },
    );

    app.delete(
      '/products/:productId/price-tiers/:priceTierId',
      {
        preHandler: authMiddleware,
        schema: deleteProductPriceTierRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            priceTierId: string;
          };
        }>,
        reply,
      ) => {
        return this.productPriceTiersController.delete(
          request.params.productId,
          request.params.priceTierId,
          reply,
        );
      },
    );
  }
}
