import { z } from 'zod';

export const createProductAdditionalServiceSchema = z.object({
  additionalServiceId: z.string().uuid({
    error: 'ID do serviço adicional inválido.',
  }),
});

export type CreateProductAdditionalServiceData = z.infer<
  typeof createProductAdditionalServiceSchema
>;
