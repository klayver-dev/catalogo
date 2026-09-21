import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';

import type { CreateCategoryData, UpdateCategoryData } from './categories-schema.js';

import type { CategoriesRepository } from './categories-repository.js';

export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(data: CreateCategoryData) {
    const categoryAlreadyExists = await this.categoriesRepository.findBySlug(data.slug);

    if (categoryAlreadyExists) {
      throw new BadRequestError('Categoria já cadastrada.');
    }

    return this.categoriesRepository.create(data);
  }

  async findAll() {
    return this.categoriesRepository.findAll();
  }

  async findById(id: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundError('Categoria não encontrada.');
    }

    return category;
  }

  async update(id: string, data: UpdateCategoryData) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundError('Categoria não encontrada.');
    }

    if (data.slug !== undefined && data.slug !== category.slug) {
      const categoryAlreadyExists = await this.categoriesRepository.findBySlug(data.slug);

      if (categoryAlreadyExists) {
        throw new BadRequestError('Slug já está sendo utilizado.');
      }
    }

    return this.categoriesRepository.update(id, data);
  }

  async delete(id: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundError('Categoria não encontrada.');
    }

    await this.categoriesRepository.delete(id);
  }
}
