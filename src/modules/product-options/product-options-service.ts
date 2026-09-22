import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';
import type { ProductOptionsRepository } from './product-options-repository.js';
import type { CreateProductOptionData, UpdateProductOptionData } from './product-options-schema.js';

export class ProductOptionsService {
  constructor(private readonly productOptionsRepository: ProductOptionsRepository) {}

  async create(productId: string, data: CreateProductOptionData) {
    const product = await this.productOptionsRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    const option = await this.productOptionsRepository.findOptionById(data.optionId);

    if (!option) {
      throw new NotFoundError('Opção não encontrada.');
    }

    const alreadyExists = await this.productOptionsRepository.findByProductAndOption(
      productId,
      data.optionId,
    );

    if (alreadyExists) {
      throw new BadRequestError('Opção já está vinculada ao produto.');
    }

    return this.productOptionsRepository.create(productId, data);
  }

  async findAll(productId: string) {
    const product = await this.productOptionsRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return this.productOptionsRepository.findAllByProductId(productId);
  }

  async update(productId: string, productOptionId: string, data: UpdateProductOptionData) {
    const productOption = await this.productOptionsRepository.findByIdAndProductId(
      productOptionId,
      productId,
    );

    if (!productOption) {
      throw new NotFoundError('Opção do produto não encontrada.');
    }

    return this.productOptionsRepository.update(productOptionId, data);
  }

  async delete(productId: string, productOptionId: string) {
    const productOption = await this.productOptionsRepository.findByIdAndProductId(
      productOptionId,
      productId,
    );

    if (!productOption) {
      throw new NotFoundError('Opção do produto não encontrada.');
    }

    await this.productOptionsRepository.delete(productOptionId);
  }
}
