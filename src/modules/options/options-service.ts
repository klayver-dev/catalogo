import { NotFoundError } from '../../errors/not-found-error.js';

import type { CreateOptionData, UpdateOptionData } from './options-schema.js';

import type { OptionsRepository } from './options-repository.js';

export class OptionsService {
  constructor(private readonly optionsRepository: OptionsRepository) {}

  async create(data: CreateOptionData) {
    const optionGroup = await this.optionsRepository.findOptionGroupById(data.optionGroupId);

    if (!optionGroup) {
      throw new NotFoundError('Grupo de opções não encontrado.');
    }

    return this.optionsRepository.create(data);
  }

  async findAll() {
    return this.optionsRepository.findAll();
  }

  async findById(id: string) {
    const option = await this.optionsRepository.findById(id);

    if (!option) {
      throw new NotFoundError('Opção não encontrada.');
    }

    return option;
  }

  async update(id: string, data: UpdateOptionData) {
    const option = await this.optionsRepository.findById(id);

    if (!option) {
      throw new NotFoundError('Opção não encontrada.');
    }

    if (data.optionGroupId !== undefined) {
      const optionGroup = await this.optionsRepository.findOptionGroupById(data.optionGroupId);

      if (!optionGroup) {
        throw new NotFoundError('Grupo de opções não encontrado.');
      }
    }

    return this.optionsRepository.update(id, data);
  }

  async delete(id: string) {
    const option = await this.optionsRepository.findById(id);

    if (!option) {
      throw new NotFoundError('Opção não encontrada.');
    }

    await this.optionsRepository.delete(id);
  }
}
