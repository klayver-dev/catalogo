import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import Fastify from 'fastify';

import { frontendUrl } from './config.js';
import { createAuthModule } from './containers/auth-container.js';
import { createCategoriesModule } from './containers/categories-container.js';
import { createOptionGroupsModule } from './containers/option-groups-container.js';
import { createOptionsModule } from './containers/options-container.js';
import { createProductImagesModule } from './containers/product-images-container.js';
import { createProductOptionGroupsModule } from './containers/product-option-groups-container.js';
import { createProductsModule } from './containers/products-container.js';
import { createUsersModule } from './containers/users-container.js';
import { registerErrorHandler } from './error-handler.js';
import { registerSwagger } from './swagger.js';

const app = Fastify();

await app.register(cors, {
  origin: frontendUrl,
  credentials: true,
});

await app.register(cookie);

await registerSwagger(app);

registerErrorHandler(app);

const authRoutes = createAuthModule();
const usersRoutes = createUsersModule();
const categoriesRoutes = createCategoriesModule();
const productsRoutes = createProductsModule();
const productsImagesRoutes = createProductImagesModule();
const optionGroupsRoutes = createOptionGroupsModule();
const optionsRoutes = createOptionsModule();
const productOptionGroupsRoutes = createProductOptionGroupsModule();

authRoutes.register(app);
usersRoutes.register(app);
categoriesRoutes.register(app);
productsRoutes.register(app);
productsImagesRoutes.register(app);
optionGroupsRoutes.register(app);
optionsRoutes.register(app);
productOptionGroupsRoutes.register(app);

export { app };
