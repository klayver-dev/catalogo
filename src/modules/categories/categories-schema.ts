import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(2, {
    error: 'Nome deve ter pelo menos 2 caracteres.',
  }),

  slug: z.string().min(2, {
    error: 'Slug deve ter pelo menos 2 caracteres.',
  }),
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z
  .object({
    name: z
      .string()
      .min(2, {
        error: 'Nome deve ter pelo menos 2 caracteres.',
      })
      .optional(),

    slug: z
      .string()
      .min(2, {
        error: 'Slug deve ter pelo menos 2 caracteres.',
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
      data.name !== undefined ||
      data.slug !== undefined ||
      data.active !== undefined ||
      data.position !== undefined,
    {
      error: 'Informe pelo menos um campo para atualizar.',
    },
  );

export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
