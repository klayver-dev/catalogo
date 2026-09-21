import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import { createOptionSchema, updateOptionSchema } from './options-schema.js';

import {
  createOptionRouteSchema,
  deleteOptionRouteSchema,
  findAllOptionsRouteSchema,
  findOptionRouteSchema,
  updateOptionRouteSchema,
} from './options-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';

import type { OptionsController } from './options-controller.js';

export class OptionsRoutes {
  constructor(
    private readonly optionsController: OptionsController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/options',
      {
        preHandler: authMiddleware,
        schema: createOptionRouteSchema,
      },
      async (request, reply) => {
        const req = createOptionSchema.safeParse(request.body);

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

        return this.optionsController.create(req.data, reply);
      },
    );

    app.get(
      '/options',
      {
        schema: findAllOptionsRouteSchema,
      },
      async (_request, reply) => {
        return this.optionsController.findAll(reply);
      },
    );

    app.get(
      '/options/:id',
      {
        schema: findOptionRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.optionsController.findById(request.params.id, reply);
      },
    );

    app.patch(
      '/options/:id',
      {
        preHandler: authMiddleware,
        schema: updateOptionRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        const req = updateOptionSchema.safeParse(request.body);

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

        return this.optionsController.update(request.params.id, req.data, reply);
      },
    );

    app.delete(
      '/options/:id',
      {
        preHandler: authMiddleware,
        schema: deleteOptionRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.optionsController.delete(request.params.id, reply);
      },
    );
  }
}
