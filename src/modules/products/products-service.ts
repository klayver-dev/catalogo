import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';
import type { ProductsRepository } from './products-repository.js';
import type { CreateProductData, UpdateProductData } from './products-schema.js';

export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(data: CreateProductData) {
    const category = await this.productsRepository.findCategoryById(data.categoryId);

    if (!category) {
      throw new NotFoundError('Categoria não encontrada.');
    }

    const productAlreadyExists = await this.productsRepository.findBySlug(data.slug);

    if (productAlreadyExists) {
      throw new BadRequestError('Produto já cadastrado.');
    }

    if (data.sku) {
      const skuAlreadyExists = await this.productsRepository.findBySku(data.sku);

      if (skuAlreadyExists) {
        throw new BadRequestError('SKU já está sendo utilizado.');
      }
    }

    return this.productsRepository.create(data);
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findById(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return product;
  }

  async update(id: string, data: UpdateProductData) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    if (data.categoryId !== undefined) {
      const category = await this.productsRepository.findCategoryById(data.categoryId);

      if (!category) {
        throw new NotFoundError('Categoria não encontrada.');
      }
    }

    if (data.slug !== undefined && data.slug !== product.slug) {
      const productAlreadyExists = await this.productsRepository.findBySlug(data.slug);

      if (productAlreadyExists) {
        throw new BadRequestError('Slug já está sendo utilizado.');
      }
    }

    if (data.sku !== undefined && data.sku !== product.sku) {
      const skuAlreadyExists = await this.productsRepository.findBySku(data.sku);

      if (skuAlreadyExists) {
        throw new BadRequestError('SKU já está sendo utilizado.');
      }
    }

    return this.productsRepository.update(id, data);
  }

  async delete(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    await this.productsRepository.delete(id);
  }
}
