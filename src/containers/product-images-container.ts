import { AuthorizationRepository } from '../modules/authorization/authorization-repository.js';
import { AuthorizationService } from '../modules/authorization/authorization-service.js';
import { ProductImagesController } from '../modules/product-images/product-images-controller.js';
import { ProductImagesRepository } from '../modules/product-images/product-images-repository.js';
import { ProductImagesRoutes } from '../modules/product-images/product-images-routes.js';
import { ProductImagesService } from '../modules/product-images/product-images-service.js';

export function createProductImagesModule() {
  const authorizationRepository = new AuthorizationRepository();
  const authorizationService = new AuthorizationService(authorizationRepository);

  const productImagesRepository = new ProductImagesRepository();
  const productImagesService = new ProductImagesService(productImagesRepository);
  const productImagesController = new ProductImagesController(productImagesService);
  const productImagesRoutes = new ProductImagesRoutes(
    productImagesController,
    authorizationService,
  );

  return productImagesRoutes;
}
