import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { ProductOptionGroupsController } from '../modules/product-option-groups/product-option-groups-controller.js';
import { ProductOptionGroupsRepository } from '../modules/product-option-groups/product-option-groups-repository.js';
import { ProductOptionGroupsRoutes } from '../modules/product-option-groups/product-option-groups-routes.js';
import { ProductOptionGroupsService } from '../modules/product-option-groups/product-option-groups-service.js';

export function createProductOptionGroupsModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const productOptionGroupsRepository = new ProductOptionGroupsRepository();

  const productOptionGroupsService = new ProductOptionGroupsService(productOptionGroupsRepository);

  const productOptionGroupsController = new ProductOptionGroupsController(
    productOptionGroupsService,
  );

  const productOptionGroupsRoutes = new ProductOptionGroupsRoutes(
    productOptionGroupsController,
    authorizationService,
  );

  return productOptionGroupsRoutes;
}
