import { NotFoundError } from '../../errors/not-found-error.js';
import { deleteUpload, saveUpload } from '../../lib/upload.js';
import type { ProductImagesRepository } from './product-images-repository.js';
import type { CreateProductImageData, UpdateProductImageData } from './product-images-schema.js';

export class ProductImagesService {
  constructor(private readonly productImagesRepository: ProductImagesRepository) {}

  async create(productId: string, data: CreateProductImageData, image: Buffer, extension: string) {
    const product = await this.productImagesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    const imageUrl = await saveUpload(image, 'products', extension);

    try {
      return await this.productImagesRepository.create(productId, data, imageUrl);
    } catch (error) {
      await deleteUpload(imageUrl);
      throw error;
    }
  }

  async findAll(productId: string) {
    const product = await this.productImagesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    return this.productImagesRepository.findAllByProductId(productId);
  }

  async update(
    productId: string,
    imageId: string,
    data: UpdateProductImageData,
    image?: Buffer,
    extension?: string,
  ) {
    const product = await this.productImagesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    const productImage = await this.productImagesRepository.findByIdAndProductId(
      imageId,
      productId,
    );

    if (!productImage) {
      throw new NotFoundError('Imagem do produto não encontrada.');
    }

    let imageUrl: string | undefined;

    if (image && extension) {
      imageUrl = await saveUpload(image, 'products', extension);
    }

    try {
      const updatedImage = await this.productImagesRepository.update(imageId, data, imageUrl);

      if (imageUrl) {
        await deleteUpload(productImage.url);
      }

      return updatedImage;
    } catch (error) {
      if (imageUrl) {
        await deleteUpload(imageUrl);
      }

      throw error;
    }
  }

  async delete(productId: string, imageId: string) {
    const product = await this.productImagesRepository.findProductById(productId);

    if (!product) {
      throw new NotFoundError('Produto não encontrado.');
    }

    const productImage = await this.productImagesRepository.findByIdAndProductId(
      imageId,
      productId,
    );

    if (!productImage) {
      throw new NotFoundError('Imagem do produto não encontrada.');
    }

    await this.productImagesRepository.delete(imageId);

    await deleteUpload(productImage.url);
  }
}
