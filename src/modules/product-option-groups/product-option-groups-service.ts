import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';

import type {
  CreateProductOptionGroupData,
  UpdateProductOptionGroupData,
} from './product-option-groups-schema.js';

import type { ProductOptionGroupsRepository } from './product-option-groups-repository.js';

export class ProductOptionGroupsService {
  constructor(private readonly productOptionGroupsRepository: ProductOptionGroupsRepository) {}

  async create(productId: string, data: CreateProductOptionGroupData) {
    const product = await this.productOptionGroupsRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    const optionGroup = await this.productOptionGroupsRepository.findOptionGroupById(
      data.optionGroupId,
    );

    if (!optionGroup) {
      throw new NotFoundError('Grupo de opções não encontrado.');
    }

    const alreadyExists = await this.productOptionGroupsRepository.findByProductAndOptionGroup(
      productId,
      data.optionGroupId,
    );

    if (alreadyExists) {
      throw new BadRequestError('Grupo de opções já está vinculado ao produto.');
    }

    return this.productOptionGroupsRepository.create(productId, data);
  }

  async findAll(productId: string) {
    const product = await this.productOptionGroupsRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return this.productOptionGroupsRepository.findAllByProductId(productId);
  }

  async update(
    productId: string,
    productOptionGroupId: string,
    data: UpdateProductOptionGroupData,
  ) {
    const productOptionGroup = await this.productOptionGroupsRepository.findByIdAndProductId(
      productOptionGroupId,
      productId,
    );

    if (!productOptionGroup) {
      throw new NotFoundError('Grupo de opções do produto não encontrado.');
    }

    return this.productOptionGroupsRepository.update(productOptionGroupId, data);
  }

  async delete(productId: string, productOptionGroupId: string) {
    const productOptionGroup = await this.productOptionGroupsRepository.findByIdAndProductId(
      productOptionGroupId,
      productId,
    );

    if (!productOptionGroup) {
      throw new NotFoundError('Grupo de opções do produto não encontrado.');
    }

    await this.productOptionGroupsRepository.delete(productOptionGroupId);
  }
}
