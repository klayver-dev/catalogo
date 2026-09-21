import { NotFoundError } from '../../errors/not-found-error.js';
import type { ProductImagesRepository } from './product-images-repository.js';
import type { CreateProductImageData, UpdateProductImageData } from './product-images-schema.js';

export class ProductImagesService {
  constructor(private readonly productImagesRepository: ProductImagesRepository) {}

  async create(productId: string, data: CreateProductImageData) {
    const product = await this.productImagesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return this.productImagesRepository.create(productId, data);
  }

  async findAll(productId: string) {
    const product = await this.productImagesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return this.productImagesRepository.findAllByProductId(productId);
  }

  async update(productId: string, imageId: string, data: UpdateProductImageData) {
    const image = await this.productImagesRepository.findByIdAndProductId(imageId, productId);

    if (!image) {
      throw new NotFoundError('Imagem não encontrada.');
    }

    return this.productImagesRepository.update(imageId, productId, data);
  }

  async delete(productId: string, imageId: string) {
    const image = await this.productImagesRepository.findByIdAndProductId(imageId, productId);

    if (!image) {
      throw new NotFoundError('Imagem não encontrada.');
    }

    await this.productImagesRepository.delete(imageId, productId);
  }
}
