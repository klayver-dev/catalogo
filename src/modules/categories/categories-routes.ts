import type { FastifyInstance, FastifyRequest } from 'fastify';
import { authMiddleware } from '../../middlewares/auth-middleware.js';
import type { AuthorizationService } from '../authorization/authorization-service.js';
import type { CategoriesController } from './categories-controller.js';
import { createCategorySchema, updateCategorySchema } from './categories-schema.js';
import {
  createCategoryRouteSchema,
  deleteCategoryRouteSchema,
  findAllCategoriesRouteSchema,
  findCategoryRouteSchema,
  updateCategoryRouteSchema,
} from './categories-swagger.js';

export class CategoriesRoutes {
  constructor(
    private readonly categoriesController: CategoriesController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/categories',
      {
        preHandler: authMiddleware,
        schema: createCategoryRouteSchema,
      },
      async (request, reply) => {
        // autorização administrativa será aplicada aqui

        const req = createCategorySchema.safeParse(request.body);

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

        return this.categoriesController.create(req.data, reply);
      },
    );

    app.get(
      '/categories',
      {
        schema: findAllCategoriesRouteSchema,
      },
      async (_request, reply) => {
        return this.categoriesController.findAll(reply);
      },
    );

    app.get(
      '/categories/:id',
      {
        schema: findCategoryRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.categoriesController.findById(request.params.id, reply);
      },
    );

    app.patch(
      '/categories/:id',
      {
        preHandler: authMiddleware,
        schema: updateCategoryRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        const req = updateCategorySchema.safeParse(request.body);

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

        return this.categoriesController.update(request.params.id, req.data, reply);
      },
    );

    app.delete(
      '/categories/:id',
      {
        preHandler: authMiddleware,
        schema: deleteCategoryRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.categoriesController.delete(request.params.id, reply);
      },
    );
  }
}
