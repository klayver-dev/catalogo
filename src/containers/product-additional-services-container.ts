import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { ProductAdditionalServicesController } from '../modules/product-additional-services/product-additional-services-controller.js';
import { ProductAdditionalServicesRepository } from '../modules/product-additional-services/product-additional-services-repository.js';
import { ProductAdditionalServicesRoutes } from '../modules/product-additional-services/product-additional-services-routes.js';
import { ProductAdditionalServicesService } from '../modules/product-additional-services/product-additional-services-service.js';

export function createProductAdditionalServicesModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const productAdditionalServicesRepository = new ProductAdditionalServicesRepository();

  const productAdditionalServicesService = new ProductAdditionalServicesService(
    productAdditionalServicesRepository,
  );

  const productAdditionalServicesController = new ProductAdditionalServicesController(
    productAdditionalServicesService,
  );

  const productAdditionalServicesRoutes = new ProductAdditionalServicesRoutes(
    productAdditionalServicesController,
    authorizationService,
  );

  return productAdditionalServicesRoutes;
}
