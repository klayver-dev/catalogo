import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import {
  createPriceCombinationSchema,
  updatePriceCombinationSchema,
} from './price-combinations-schema.js';

import {
  createPriceCombinationRouteSchema,
  deletePriceCombinationRouteSchema,
  findAllPriceCombinationsRouteSchema,
  updatePriceCombinationRouteSchema,
} from './price-combinations-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';

import type { PriceCombinationsController } from './price-combinations-controller.js';

export class PriceCombinationsRoutes {
  constructor(
    private readonly priceCombinationsController: PriceCombinationsController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/price-tiers/:priceTierId/combinations',
      {
        preHandler: authMiddleware,
        schema: createPriceCombinationRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            priceTierId: string;
          };
        }>,
        reply,
      ) => {
        const req = createPriceCombinationSchema.safeParse(request.body);

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

        return this.priceCombinationsController.create(request.params.priceTierId, req.data, reply);
      },
    );

    app.get(
      '/price-tiers/:priceTierId/combinations',
      {
        schema: findAllPriceCombinationsRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            priceTierId: string;
          };
        }>,
        reply,
      ) => {
        return this.priceCombinationsController.findAll(request.params.priceTierId, reply);
      },
    );

    app.patch(
      '/price-tiers/:priceTierId/combinations/:combinationId',
      {
        preHandler: authMiddleware,
        schema: updatePriceCombinationRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            priceTierId: string;
            combinationId: string;
          };
        }>,
        reply,
      ) => {
        const req = updatePriceCombinationSchema.safeParse(request.body);

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

        return this.priceCombinationsController.update(
          request.params.priceTierId,
          request.params.combinationId,
          req.data,
          reply,
        );
      },
    );

    app.delete(
      '/price-tiers/:priceTierId/combinations/:combinationId',
      {
        preHandler: authMiddleware,
        schema: deletePriceCombinationRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            priceTierId: string;
            combinationId: string;
          };
        }>,
        reply,
      ) => {
        return this.priceCombinationsController.delete(
          request.params.priceTierId,
          request.params.combinationId,
          reply,
        );
      },
    );
  }
}
