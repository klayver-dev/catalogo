import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';

import { AuthorizationService } from '../modules/authorization/authorization-service.js';

import { CategoriesController } from '../modules/categories/categories-controller.js';

import { CategoriesRepository } from '../modules/categories/categories-repository.js';

import { CategoriesRoutes } from '../modules/categories/categories-routes.js';

import { CategoriesService } from '../modules/categories/categories-service.js';

export function createCategoriesModule() {
  // authorizations

  const authorizationRepository = new AuthorizationRepository();

  const authorizationService = new AuthorizationService(authorizationRepository);

  // categories

  const categoriesRepository = new CategoriesRepository();

  const categoriesService = new CategoriesService(categoriesRepository);

  const categoriesController = new CategoriesController(categoriesService);

  const categoriesRoutes = new CategoriesRoutes(categoriesController, authorizationService);

  return categoriesRoutes;
}
