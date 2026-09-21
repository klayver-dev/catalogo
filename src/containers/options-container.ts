import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { OptionsController } from '../modules/options/options-controller.js';
import { OptionsRepository } from '../modules/options/options-repository.js';
import { OptionsRoutes } from '../modules/options/options-routes.js';
import { OptionsService } from '../modules/options/options-service.js';

export function createOptionsModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const optionsRepository = new OptionsRepository();

  const optionsService = new OptionsService(optionsRepository);

  const optionsController = new OptionsController(optionsService);

  const optionsRoutes = new OptionsRoutes(optionsController, authorizationService);

  return optionsRoutes;
}
