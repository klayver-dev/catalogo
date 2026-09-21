import { z } from 'zod';

export const createOptionGroupSchema = z.object({
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
});

export type CreateOptionGroupData = z.infer<typeof createOptionGroupSchema>;

export const updateOptionGroupSchema = z
  .object({
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
  })
  .refine(data => data.name !== undefined || data.position !== undefined, {
    error: 'Informe pelo menos um campo para atualizar.',
  });

export type UpdateOptionGroupData = z.infer<typeof updateOptionGroupSchema>;
