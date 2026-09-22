import { z } from 'zod';

export const createAdditionalServiceSchema = z.object({
  name: z.string().min(2, {
    error: 'Nome deve ter pelo menos 2 caracteres.',
  }),

  description: z.string().optional(),

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

export type CreateAdditionalServiceData = z.infer<typeof createAdditionalServiceSchema>;

export const updateAdditionalServiceSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        error: 'Nome deve ter pelo menos 2 caracteres.',
      })
      .optional(),

    description: z.string().optional(),

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
      data.name !== undefined ||
      data.description !== undefined ||
      data.priceInCents !== undefined ||
      data.active !== undefined ||
      data.position !== undefined,
    {
      error: 'Informe pelo menos um campo para atualizar.',
    },
  );

export type UpdateAdditionalServiceData = z.infer<typeof updateAdditionalServiceSchema>;
