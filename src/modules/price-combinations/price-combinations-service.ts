import { BadRequestError } from '../../errors/bad-request-error.js';
import { NotFoundError } from '../../errors/not-found-error.js';

import type {
  CreatePriceCombinationData,
  UpdatePriceCombinationData,
} from './price-combinations-schema.js';

import type { PriceCombinationsRepository } from './price-combinations-repository.js';

export class PriceCombinationsService {
  constructor(private readonly priceCombinationsRepository: PriceCombinationsRepository) {}

  async create(priceTierId: string, data: CreatePriceCombinationData) {
    const priceTier = await this.priceCombinationsRepository.findPriceTierById(priceTierId);

    if (!priceTier) {
      throw new NotFoundError('Faixa de preço não encontrada.');
    }

    const uniqueOptionIds = [...new Set(data.optionIds)];

    if (uniqueOptionIds.length !== data.optionIds.length) {
      throw new BadRequestError('Não é permitido informar a mesma opção mais de uma vez.');
    }

    const productOptions = await this.priceCombinationsRepository.findProductOptions(
      priceTier.productId,
      uniqueOptionIds,
    );

    if (productOptions.length !== uniqueOptionIds.length) {
      throw new BadRequestError('Uma ou mais opções não estão vinculadas ao produto.');
    }

    const existingCombinations =
      await this.priceCombinationsRepository.findExistingCombinations(priceTierId);

    const requestedOptions = [...uniqueOptionIds].sort();

    const combinationAlreadyExists = existingCombinations.some(combination => {
      const combinationOptions = combination.options.map(option => option.optionId).sort();

      return (
        combinationOptions.length === requestedOptions.length &&
        combinationOptions.every((optionId, index) => optionId === requestedOptions[index])
      );
    });

    if (combinationAlreadyExists) {
      throw new BadRequestError('Essa combinação de opções já existe para a faixa de preço.');
    }

    return this.priceCombinationsRepository.create(priceTierId, {
      ...data,
      optionIds: uniqueOptionIds,
    });
  }

  async findAll(priceTierId: string) {
    const priceTier = await this.priceCombinationsRepository.findPriceTierById(priceTierId);

    if (!priceTier) {
      throw new NotFoundError('Faixa de preço não encontrada.');
    }

    return this.priceCombinationsRepository.findAllByPriceTierId(priceTierId);
  }

  async update(priceTierId: string, combinationId: string, data: UpdatePriceCombinationData) {
    const combination = await this.priceCombinationsRepository.findByIdAndPriceTierId(
      combinationId,
      priceTierId,
    );

    if (!combination) {
      throw new NotFoundError('Combinação de preço não encontrada.');
    }

    return this.priceCombinationsRepository.update(combinationId, data);
  }

  async delete(priceTierId: string, combinationId: string) {
    const combination = await this.priceCombinationsRepository.findByIdAndPriceTierId(
      combinationId,
      priceTierId,
    );

    if (!combination) {
      throw new NotFoundError('Combinação de preço não encontrada.');
    }

    await this.priceCombinationsRepository.delete(combinationId);
  }
}
