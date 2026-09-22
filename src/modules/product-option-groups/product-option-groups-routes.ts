import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import {
  createProductOptionGroupSchema,
  updateProductOptionGroupSchema,
} from './product-option-groups-schema.js';

import {
  createProductOptionGroupRouteSchema,
  deleteProductOptionGroupRouteSchema,
  findAllProductOptionGroupsRouteSchema,
  updateProductOptionGroupRouteSchema,
} from './product-option-groups-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';

import type { ProductOptionGroupsController } from './product-option-groups-controller.js';

export class ProductOptionGroupsRoutes {
  constructor(
    private readonly productOptionGroupsController: ProductOptionGroupsController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/products/:productId/option-groups',
      {
        preHandler: authMiddleware,
        schema: createProductOptionGroupRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        const req = createProductOptionGroupSchema.safeParse(request.body);

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

        return this.productOptionGroupsController.create(request.params.productId, req.data, reply);
      },
    );

    app.get(
      '/products/:productId/option-groups',
      {
        schema: findAllProductOptionGroupsRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
          };
        }>,
        reply,
      ) => {
        return this.productOptionGroupsController.findAll(request.params.productId, reply);
      },
    );

    app.patch(
      '/products/:productId/option-groups/:optionGroupId',
      {
        preHandler: authMiddleware,
        schema: updateProductOptionGroupRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            optionGroupId: string;
          };
        }>,
        reply,
      ) => {
        const req = updateProductOptionGroupSchema.safeParse(request.body);

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

        return this.productOptionGroupsController.update(
          request.params.productId,
          request.params.optionGroupId,
          req.data,
          reply,
        );
      },
    );

    app.delete(
      '/products/:productId/option-groups/:optionGroupId',
      {
        preHandler: authMiddleware,
        schema: deleteProductOptionGroupRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            productId: string;
            optionGroupId: string;
          };
        }>,
        reply,
      ) => {
        return this.productOptionGroupsController.delete(
          request.params.productId,
          request.params.optionGroupId,
          reply,
        );
      },
    );
  }
}
