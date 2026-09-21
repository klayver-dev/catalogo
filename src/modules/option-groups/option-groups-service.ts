import { NotFoundError } from '../../errors/not-found-error.js';
import type { OptionGroupsRepository } from './option-groups-repository.js';
import type { CreateOptionGroupData, UpdateOptionGroupData } from './option-groups-schema.js';

export class OptionGroupsService {
  constructor(private readonly optionGroupsRepository: OptionGroupsRepository) {}

  async create(data: CreateOptionGroupData) {
    return this.optionGroupsRepository.create(data);
  }

  async findAll() {
    return this.optionGroupsRepository.findAll();
  }

  async findById(id: string) {
    const optionGroup = await this.optionGroupsRepository.findById(id);

    if (!optionGroup) {
      throw new NotFoundError('Grupo de opções não encontrado.');
    }

    return optionGroup;
  }

  async update(id: string, data: UpdateOptionGroupData) {
    const optionGroup = await this.optionGroupsRepository.findById(id);

    if (!optionGroup) {
      throw new NotFoundError('Grupo de opções não encontrado.');
    }

    return this.optionGroupsRepository.update(id, data);
  }

  async delete(id: string) {
    const optionGroup = await this.optionGroupsRepository.findById(id);

    if (!optionGroup) {
      throw new NotFoundError('Grupo de opções não encontrado.');
    }

    await this.optionGroupsRepository.delete(id);
  }
}
