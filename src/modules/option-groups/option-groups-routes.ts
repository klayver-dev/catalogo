import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { createOptionGroupSchema, updateOptionGroupSchema } from './option-groups-schema.js';

import {
  createOptionGroupRouteSchema,
  deleteOptionGroupRouteSchema,
  findAllOptionGroupsRouteSchema,
  findOptionGroupRouteSchema,
  updateOptionGroupRouteSchema,
} from './option-groups-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';
import type { OptionGroupsController } from './option-groups-controller.js';

export class OptionGroupsRoutes {
  constructor(
    private readonly optionGroupsController: OptionGroupsController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/option-groups',
      {
        preHandler: authMiddleware,
        schema: createOptionGroupRouteSchema,
      },
      async (request, reply) => {
        // autorização administrativa será aplicada aqui

        const req = createOptionGroupSchema.safeParse(request.body);

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

        return this.optionGroupsController.create(req.data, reply);
      },
    );

    app.get(
      '/option-groups',
      {
        schema: findAllOptionGroupsRouteSchema,
      },
      async (_request, reply) => {
        return this.optionGroupsController.findAll(reply);
      },
    );

    app.get(
      '/option-groups/:id',
      {
        schema: findOptionGroupRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.optionGroupsController.findById(request.params.id, reply);
      },
    );

    app.patch(
      '/option-groups/:id',
      {
        preHandler: authMiddleware,
        schema: updateOptionGroupRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        const req = updateOptionGroupSchema.safeParse(request.body);

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

        return this.optionGroupsController.update(request.params.id, req.data, reply);
      },
    );

    app.delete(
      '/option-groups/:id',
      {
        preHandler: authMiddleware,
        schema: deleteOptionGroupRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.optionGroupsController.delete(request.params.id, reply);
      },
    );
  }
}
