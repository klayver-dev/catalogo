import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { ProductOptionsController } from '../modules/product-options/product-options-controller.js';
import { ProductOptionsRepository } from '../modules/product-options/product-options-repository.js';
import { ProductOptionsRoutes } from '../modules/product-options/product-options-routes.js';
import { ProductOptionsService } from '../modules/product-options/product-options-service.js';

export function createProductOptionsModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const productOptionsRepository = new ProductOptionsRepository();

  const productOptionsService = new ProductOptionsService(productOptionsRepository);

  const productOptionsController = new ProductOptionsController(productOptionsService);

  const productOptionsRoutes = new ProductOptionsRoutes(
    productOptionsController,
    authorizationService,
  );

  return productOptionsRoutes;
}
