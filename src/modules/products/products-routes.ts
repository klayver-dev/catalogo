import type { FastifyInstance, FastifyRequest } from 'fastify';
import { authMiddleware } from '../../middlewares/auth-middleware.js';
import type { AuthorizationService } from '../authorization/authorization-service.js';
import type { ProductsController } from './products-controller.js';
import { createProductSchema, updateProductSchema } from './products-schema.js';
import {
  createProductRouteSchema,
  deleteProductRouteSchema,
  findAllProductsRouteSchema,
  findProductRouteSchema,
  updateProductRouteSchema,
} from './products-swagger.js';

export class ProductsRoutes {
  constructor(
    private readonly productsController: ProductsController,
    private readonly authorizationService: AuthorizationService,
  ) {}

  register(app: FastifyInstance) {
    app.post(
      '/products',
      {
        preHandler: authMiddleware,
        schema: createProductRouteSchema,
      },
      async (request, reply) => {
        // autorização administrativa será aplicada aqui

        const req = createProductSchema.safeParse(request.body);

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

        return this.productsController.create(req.data, reply);
      },
    );

    app.get(
      '/products',
      {
        schema: findAllProductsRouteSchema,
      },
      async (_request, reply) => {
        return this.productsController.findAll(reply);
      },
    );

    app.get(
      '/products/:id',
      {
        schema: findProductRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.productsController.findById(request.params.id, reply);
      },
    );

    app.patch(
      '/products/:id',
      {
        preHandler: authMiddleware,
        schema: updateProductRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        const req = updateProductSchema.safeParse(request.body);

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

        return this.productsController.update(request.params.id, req.data, reply);
      },
    );

    app.delete(
      '/products/:id',
      {
        preHandler: authMiddleware,
        schema: deleteProductRouteSchema,
      },
      async (
        request: FastifyRequest<{
          Params: {
            id: string;
          };
        }>,
        reply,
      ) => {
        return this.productsController.delete(request.params.id, reply);
      },
    );
  }
}
