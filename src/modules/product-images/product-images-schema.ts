import { z } from 'zod';

export const createProductImageSchema = z.object({
  alt: z.string().optional(),
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

export type CreateProductImageData = z.infer<typeof createProductImageSchema>;

export const updateProductImageSchema = z
  .object({
    alt: z.string().optional(),
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
  .refine(data => data.alt !== undefined || data.position !== undefined, {
    error: 'Informe pelo menos um campo para atualizar.',
  });

export type UpdateProductImageData = z.infer<typeof updateProductImageSchema>;
