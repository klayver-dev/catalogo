import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { OptionGroupsController } from '../modules/option-groups/option-groups-controller.js';
import { OptionGroupsRepository } from '../modules/option-groups/option-groups-repository.js';
import { OptionGroupsRoutes } from '../modules/option-groups/option-groups-routes.js';
import { OptionGroupsService } from '../modules/option-groups/option-groups-service.js';

export function createOptionGroupsModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const optionGroupsRepository = new OptionGroupsRepository();

  const optionGroupsService = new OptionGroupsService(optionGroupsRepository);

  const optionGroupsController = new OptionGroupsController(optionGroupsService);

  const optionGroupsRoutes = new OptionGroupsRoutes(optionGroupsController, authorizationService);

  return optionGroupsRoutes;
}
