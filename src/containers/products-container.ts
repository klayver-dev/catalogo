import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';
import { ProductsController } from '../modules/products/products-controller.js';
import { ProductsRepository } from '../modules/products/products-repository.js';
import { ProductsRoutes } from '../modules/products/products-routes.js';
import { ProductsService } from '../modules/products/products-service.js';

export function createProductsModule() {
  // authorizations
  const authorizationRepository = new AuthorizationRepository();
  const authorizationService = new AuthorizationService(authorizationRepository);

  // products
  const productsRepository = new ProductsRepository();
  const productsService = new ProductsService(productsRepository);
  const productsController = new ProductsController(productsService);
  const productsRoutes = new ProductsRoutes(productsController, authorizationService);

  return productsRoutes;
}
