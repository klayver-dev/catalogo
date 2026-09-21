import { z } from 'zod';

export const createOptionSchema = z.object({
  optionGroupId: z.string().uuid({
    error: 'ID do grupo de opções inválido.',
  }),

  name: z.string().min(2, {
    error: 'Nome deve ter pelo menos 2 caracteres.',
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

  active: z.boolean().optional(),
});

export type CreateOptionData = z.infer<typeof createOptionSchema>;

export const updateOptionSchema = z
  .object({
    optionGroupId: z
      .string()
      .uuid({
        error: 'ID do grupo de opções inválido.',
      })
      .optional(),

    name: z
      .string()
      .min(2, {
        error: 'Nome deve ter pelo menos 2 caracteres.',
      })
      .optional(),

    position: z
      .number()
      .int({
        error: 'Posição deve ser um número inteiro.',
      })
      .min(0, {
        error: 'Posição não pode ser negativa.',
      })
      .optional(),

    active: z.boolean().optional(),
  })
  .refine(
    data =>
      data.optionGroupId !== undefined ||
      data.name !== undefined ||
      data.position !== undefined ||
      data.active !== undefined,
    {
      error: 'Informe pelo menos um campo para atualizar.',
    },
  );

export type UpdateOptionData = z.infer<typeof updateOptionSchema>;
