import { z } from 'zod';

export const createProductOptionGroupSchema = z.object({
  optionGroupId: z.string().uuid({
    error: 'ID do grupo de opções inválido.',
  }),

  position: z
    .number()
    .int({
      error: 'Posição deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Posição não pode ser negativa.',
    })
    .optional(),

  required: z.boolean().optional(),

  multiple: z.boolean().optional(),
});

export type CreateProductOptionGroupData = z.infer<typeof createProductOptionGroupSchema>;

export const updateProductOptionGroupSchema = z
  .object({
    position: z
      .number()
      .int({
        error: 'Posição deve ser um número inteiro.',
      })
      .min(0, {
        error: 'Posição não pode ser negativa.',
      })
      .optional(),

    required: z.boolean().optional(),

    multiple: z.boolean().optional(),
  })
  .refine(
    data =>
      data.position !== undefined || data.required !== undefined || data.multiple !== undefined,
    {
      error: 'Informe pelo menos um campo para atualizar.',
    },
  );

export type UpdateProductOptionGroupData = z.infer<typeof updateProductOptionGroupSchema>;
