import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { AdditionalServicesController } from '../modules/additional-services/additional-services-controller.js';
import { AdditionalServicesRepository } from '../modules/additional-services/additional-services-repository.js';
import { AdditionalServicesRoutes } from '../modules/additional-services/additional-services-routes.js';
import { AdditionalServicesService } from '../modules/additional-services/additional-services-service.js';

export function createAdditionalServicesModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const additionalServicesRepository = new AdditionalServicesRepository();

  const additionalServicesService = new AdditionalServicesService(additionalServicesRepository);

  const additionalServicesController = new AdditionalServicesController(additionalServicesService);

  const additionalServicesRoutes = new AdditionalServicesRoutes(
    additionalServicesController,
    authorizationService,
  );

  return additionalServicesRoutes;
}
