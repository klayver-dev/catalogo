import { z } from 'zod';

export const createProductPriceTierSchema = z.object({
  quantity: z
    .number()
    .int({
      error: 'Quantidade deve ser um número inteiro.',
    })
    .min(1, {
      error: 'Quantidade deve ser maior que zero.',
    }),

  calculationType: z
    .enum(['TOTAL', 'UNIT'], {
      error: 'Tipo de cálculo inválido.',
    })
    .optional(),

  priceInCents: z
    .number()
    .int({
      error: 'Preço deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Preço não pode ser negativo.',
    }),

  active: z.boolean().optional(),

  position: z
    .number()
    .int({
      error: 'Posição deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Posição não pode ser negativa.',
    })
    .optional(),
});

export type CreateProductPriceTierData = z.infer<typeof createProductPriceTierSchema>;

export const updateProductPriceTierSchema = z
  .object({
    quantity: z
      .number()
      .int({
        error: 'Quantidade deve ser um número inteiro.',
      })
      .min(1, {
        error: 'Quantidade deve ser maior que zero.',
      })
      .optional(),

    calculationType: z
      .enum(['TOTAL', 'UNIT'], {
        error: 'Tipo de cálculo inválido.',
      })
      .optional(),

    priceInCents: z
      .number()
      .int({
        error: 'Preço deve ser um número inteiro.',
      })
      .min(0, {
        error: 'Preço não pode ser negativo.',
      })
      .optional(),

    active: z.boolean().optional(),

    position: z
      .number()
      .int({
        error: 'Posição deve ser um número inteiro.',
      })
      .min(0, {
        error: 'Posição não pode ser negativa.',
      })
      .optional(),
  })
  .refine(
    data =>
      data.quantity !== undefined ||
      data.calculationType !== undefined ||
      data.priceInCents !== undefined ||
      data.active !== undefined ||
      data.position !== undefined,
    {
      error: 'Informe pelo menos um campo para atualizar.',
    },
  );

export type UpdateProductPriceTierData = z.infer<typeof updateProductPriceTierSchema>;
