import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';

import type { CreateProductAdditionalServiceData } from './product-additional-services-schema.js';

import type { ProductAdditionalServicesRepository } from './product-additional-services-repository.js';

export class ProductAdditionalServicesService {
  constructor(
    private readonly productAdditionalServicesRepository: ProductAdditionalServicesRepository,
  ) {}

  async create(productId: string, data: CreateProductAdditionalServiceData) {
    const product = await this.productAdditionalServicesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    const additionalService =
      await this.productAdditionalServicesRepository.findAdditionalServiceById(
        data.additionalServiceId,
      );

    if (!additionalService) {
      throw new NotFoundError('Serviço adicional não encontrado.');
    }

    const alreadyExists =
      await this.productAdditionalServicesRepository.findByProductAndAdditionalService(
        productId,
        data.additionalServiceId,
      );

    if (alreadyExists) {
      throw new BadRequestError('Serviço adicional já está vinculado ao produto.');
    }

    return this.productAdditionalServicesRepository.create(productId, data);
  }

  async findAll(productId: string) {
    const product = await this.productAdditionalServicesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return this.productAdditionalServicesRepository.findAllByProductId(productId);
  }

  async delete(productId: string, additionalServiceId: string) {
    const productAdditionalService =
      await this.productAdditionalServicesRepository.findByProductAndAdditionalService(
        productId,
        additionalServiceId,
      );

    if (!productAdditionalService) {
      throw new NotFoundError('Serviço adicional do produto não encontrado.');
    }

    await this.productAdditionalServicesRepository.delete(productId, additionalServiceId);
  }
}
