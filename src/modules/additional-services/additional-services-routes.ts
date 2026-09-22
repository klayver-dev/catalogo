import type { FastifyInstance, FastifyRequest } from 'fastify';

import { authMiddleware } from '../../middlewares/auth-middleware.js';

import {
  createAdditionalServiceSchema,
  updateAdditionalServiceSchema,
} from './additional-services-schema.js';

import {
  createAdditionalServiceRouteSchema,
  deleteAdditionalServiceRouteSchema,
  findAdditionalServiceByIdRouteSchema,
  findAllAdditionalServicesRouteSchema,
  updateAdditionalServiceRouteSchema,
} from './additional-services-swagger.js';

import type { AuthorizationService } from '../authorization/authorization-service.js';

import type { AdditionalServicesController } from './additional-services-controller.js';

export class AdditionalServicesRoutes {
  constructor(
    private readonly additionalServicesController: AdditionalServicesController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/additional-services',
      {
        preHandler: authMiddleware,
        schema: createAdditionalServiceRouteSchema,
      },
      async (request, reply) => {
        const req = createAdditionalServiceSchema.safeParse(request.body);

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

        return this.additionalServicesController.create(req.data, reply);
      },
    );

    app.get(
      '/additional-services',
      {
        schema: findAllAdditionalServicesRouteSchema,
      },
      async (_request, reply) => {
        return this.additionalServicesController.findAll(reply);
      },
    );

    app.get(
      '/additional-services/:id',
      {
        schema: findAdditionalServiceByIdRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.additionalServicesController.findById(request.params.id, reply);
      },
    );

    app.patch(
      '/additional-services/:id',
      {
        preHandler: authMiddleware,
        schema: updateAdditionalServiceRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        const req = updateAdditionalServiceSchema.safeParse(request.body);

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

        return this.additionalServicesController.update(request.params.id, req.data, reply);
      },
    );

    app.delete(
      '/additional-services/:id',
      {
        preHandler: authMiddleware,
        schema: deleteAdditionalServiceRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.additionalServicesController.delete(request.params.id, reply);
      },
    );
  }
}
