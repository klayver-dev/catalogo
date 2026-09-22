import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';

import type {
  CreateProductPriceTierData,
  UpdateProductPriceTierData,
} from './product-price-tiers-schema.js';

import type { ProductPriceTiersRepository } from './product-price-tiers-repository.js';

export class ProductPriceTiersService {
  constructor(private readonly productPriceTiersRepository: ProductPriceTiersRepository) {}

  async create(productId: string, data: CreateProductPriceTierData) {
    const product = await this.productPriceTiersRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    const alreadyExists = await this.productPriceTiersRepository.findByProductAndQuantity(
      productId,
      data.quantity,
    );

    if (alreadyExists) {
      throw new BadRequestError('Já existe uma faixa de preço para essa quantidade.');
    }

    return this.productPriceTiersRepository.create(productId, data);
  }

  async findAll(productId: string) {
    const product = await this.productPriceTiersRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return this.productPriceTiersRepository.findAllByProductId(productId);
  }

  async update(productId: string, priceTierId: string, data: UpdateProductPriceTierData) {
    const priceTier = await this.productPriceTiersRepository.findByIdAndProductId(
      priceTierId,
      productId,
    );

    if (!priceTier) {
      throw new NotFoundError('Faixa de preço do produto não encontrada.');
    }

    if (data.quantity !== undefined && data.quantity !== priceTier.quantity) {
      const alreadyExists = await this.productPriceTiersRepository.findByProductAndQuantity(
        productId,
        data.quantity,
      );

      if (alreadyExists) {
        throw new BadRequestError('Já existe uma faixa de preço para essa quantidade.');
      }
    }

    return this.productPriceTiersRepository.update(priceTierId, data);
  }

  async delete(productId: string, priceTierId: string) {
    const priceTier = await this.productPriceTiersRepository.findByIdAndProductId(
      priceTierId,
      productId,
    );

    if (!priceTier) {
      throw new NotFoundError('Faixa de preço do produto não encontrada.');
    }

    await this.productPriceTiersRepository.delete(priceTierId);
  }
}
