import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { ProductPriceTiersController } from '../modules/product-price-tiers/product-price-tiers-controller.js';
import { ProductPriceTiersRepository } from '../modules/product-price-tiers/product-price-tiers-repository.js';
import { ProductPriceTiersRoutes } from '../modules/product-price-tiers/product-price-tiers-routes.js';
import { ProductPriceTiersService } from '../modules/product-price-tiers/product-price-tiers-service.js';

export function createProductPriceTiersModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const productPriceTiersRepository = new ProductPriceTiersRepository();

  const productPriceTiersService = new ProductPriceTiersService(productPriceTiersRepository);

  const productPriceTiersController = new ProductPriceTiersController(productPriceTiersService);

  const productPriceTiersRoutes = new ProductPriceTiersRoutes(
    productPriceTiersController,
    authorizationService,
  );

  return productPriceTiersRoutes;
}
