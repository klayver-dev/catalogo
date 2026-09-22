import { NotFoundError } from '../../errors/not-found-error.js';
import { deleteUpload, saveUpload } from '../../lib/upload.js';

import type { CreateBannerData, UpdateBannerData } from './banners-schema.js';

import type { BannersRepository } from './banners-repository.js';

export class BannersService {
  constructor(private readonly bannersRepository: BannersRepository) {}

  async create(data: CreateBannerData, image: Buffer, extension: string) {
    const imageUrl = await saveUpload(image, 'banners', extension);

    try {
      return await this.bannersRepository.create(data, imageUrl);
    } catch (error) {
      await deleteUpload(imageUrl);
      throw error;
    }
  }

  async findAll() {
    return this.bannersRepository.findAll();
  }

  async findById(id: string) {
    const banner = await this.bannersRepository.findById(id);

    if (!banner) {
      throw new NotFoundError('Banner não encontrado.');
    }

    return banner;
  }

  async update(id: string, data: UpdateBannerData, image?: Buffer, extension?: string) {
    const banner = await this.bannersRepository.findById(id);

    if (!banner) {
      throw new NotFoundError('Banner não encontrado.');
    }

    let imageUrl: string | undefined;

    if (image && extension) {
      imageUrl = await saveUpload(image, 'banners', extension);
    }

    try {
      const updatedBanner = await this.bannersRepository.update(id, data, imageUrl);

      if (imageUrl) {
        await deleteUpload(banner.imageUrl);
      }

      return updatedBanner;
    } catch (error) {
      if (imageUrl) {
        await deleteUpload(imageUrl);
      }

      throw error;
    }
  }

  async delete(id: string) {
    const banner = await this.bannersRepository.findById(id);

    if (!banner) {
      throw new NotFoundError('Banner não encontrado.');
    }

    await this.bannersRepository.delete(id);

    await deleteUpload(banner.imageUrl);
  }
}
