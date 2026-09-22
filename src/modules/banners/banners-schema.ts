import { z } from 'zod';

export const createBannerSchema = z.object({
  title: z.string().min(2, {
    error: 'Título deve ter pelo menos 2 caracteres.',
  }),

  description: z.string().optional(),

  link: z
    .string()
    .url({
      error: 'URL do link inválida.',
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
});

export type CreateBannerData = z.infer<typeof createBannerSchema>;

export const updateBannerSchema = z
  .object({
    title: z
      .string()
      .min(2, {
        error: 'Título deve ter pelo menos 2 caracteres.',
      })
      .optional(),

    description: z.string().optional(),

    link: z
      .string()
      .url({
        error: 'URL do link inválida.',
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
      data.title !== undefined ||
      data.description !== undefined ||
      data.link !== undefined ||
      data.active !== undefined ||
      data.position !== undefined,
    {
      error: 'Informe pelo menos um campo para atualizar.',
    },
  );

export type UpdateBannerData = z.infer<typeof updateBannerSchema>;
