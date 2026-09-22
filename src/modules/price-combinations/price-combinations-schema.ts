import { z } from 'zod';

export const createPriceCombinationSchema = z.object({
  optionIds: z
    .array(
      z.string().uuid({
        error: 'ID da opção inválido.',
      }),
    )
    .min(1, {
      error: 'Informe pelo menos uma opção.',
    }),

  priceInCents: z
    .number()
    .int({
      error: 'Preço deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Preço não pode ser negativo.',
    }),
});

export type CreatePriceCombinationData = z.infer<typeof createPriceCombinationSchema>;

export const updatePriceCombinationSchema = z.object({
  priceInCents: z
    .number()
    .int({
      error: 'Preço deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Preço não pode ser negativo.',
    }),
});

export type UpdatePriceCombinationData = z.infer<typeof updatePriceCombinationSchema>;
