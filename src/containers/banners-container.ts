import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { BannersController } from '../modules/banners/banners-controller.js';
import { BannersRepository } from '../modules/banners/banners-repository.js';
import { BannersRoutes } from '../modules/banners/banners-routes.js';
import { BannersService } from '../modules/banners/banners-service.js';

export function createBannersModule() {
  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  const bannersRepository = new BannersRepository();

  const bannersService = new BannersService(bannersRepository);

  const bannersController = new BannersController(bannersService);

  const bannersRoutes = new BannersRoutes(bannersController, authorizationService);

  return bannersRoutes;
}
