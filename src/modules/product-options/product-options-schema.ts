import { z } from 'zod';

export const createProductOptionSchema = z.object({
  optionId: z.string().uuid({
    error: 'ID da opção inválido.',
  }),
  active: z.boolean().optional(),
  additionalPrice: z
    .number()
    .int({
      error: 'Preço adicional deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Preço adicional não pode ser negativo.',
    })
    .optional(),
});

export type CreateProductOptionData = z.infer<typeof createProductOptionSchema>;

export const updateProductOptionSchema = z
  .object({
    active: z.boolean().optional(),
    additionalPrice: z
      .number()
      .int({
        error: 'Preço adicional deve ser um número inteiro.',
      })
      .min(0, {
        error: 'Preço adicional não pode ser negativo.',
      })
      .optional(),
  })
  .refine(data => data.active !== undefined || data.additionalPrice !== undefined, {
    error: 'Informe pelo menos um campo para atualizar.',
  });

export type UpdateProductOptionData = z.infer<typeof updateProductOptionSchema>;
