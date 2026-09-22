import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { PriceCombinationsController } from '../modules/price-combinations/price-combinations-controller.js';
import { PriceCombinationsRepository } from '../modules/price-combinations/price-combinations-repository.js';
import { PriceCombinationsRoutes } from '../modules/price-combinations/price-combinations-routes.js';
import { PriceCombinationsService } from '../modules/price-combinations/price-combinations-service.js';

export function createPriceCombinationsModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const priceCombinationsRepository = new PriceCombinationsRepository();

  const priceCombinationsService = new PriceCombinationsService(priceCombinationsRepository);

  const priceCombinationsController = new PriceCombinationsController(priceCombinationsService);

  const priceCombinationsRoutes = new PriceCombinationsRoutes(
    priceCombinationsController,
    authorizationService,
  );

  return priceCombinationsRoutes;
}
