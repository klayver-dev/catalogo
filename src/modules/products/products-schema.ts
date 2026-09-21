import { z } from 'zod';

export const createProductSchema = z.object({
  categoryId: z.string().uuid({ error: 'ID da categoria inválido.' }),

  name: z.string().min(2, {
    error: 'Nome deve ter pelo menos 2 caracteres.',
  }),

  slug: z.string().min(2, {
    error: 'Slug deve ter pelo menos 2 caracteres.',
  }),

  sku: z
    .string()
    .min(1, {
      error: 'SKU não pode ser vazio.',
    })
    .optional(),

  description: z.string().optional(),

  active: z.boolean().optional(),

  featured: z.boolean().optional(),

  position: z
    .number()
    .int({
      error: 'Posição deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Posição não pode ser negativa.',
    })
    .optional(),

  productionDays: z
    .number()
    .int({
      error: 'Prazo de produção deve ser um número inteiro.',
    })
    .min(0, {
      error: 'Prazo de produção não pode ser negativo.',
    })
    .optional(),

  shippingType: z.enum(['FIXED', 'QUOTE']).optional(),

  shippingPrice: z
    .number()
    .int({
      error: 'Frete deve ser informado em centavos.',
    })
    .min(0, {
      error: 'Frete não pode ser negativo.',
    })
    .optional(),
});

export type CreateProductData = z.infer<typeof createProductSchema>;

export const updateProductSchema = z
  .object({
    categoryId: z
      .string()
      .uuid({
        error: 'ID da categoria inválido.',
      })
      .optional(),

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

    sku: z
      .string()
      .min(1, {
        error: 'SKU não pode ser vazio.',
      })
      .optional(),

    description: z.string().optional(),

    active: z.boolean().optional(),

    featured: z.boolean().optional(),

    position: z
      .number()
      .int({
        error: 'Posição deve ser um número inteiro.',
      })
      .min(0, {
        error: 'Posição não pode ser negativa.',
      })
      .optional(),

    productionDays: z
      .number()
      .int({
        error: 'Prazo de produção deve ser um número inteiro.',
      })
      .min(0, {
        error: 'Prazo de produção não pode ser negativo.',
      })
      .optional(),

    shippingType: z.enum(['FIXED', 'QUOTE']).optional(),

    shippingPrice: z
      .number()
      .int({
        error: 'Frete deve ser informado em centavos.',
      })
      .min(0, {
        error: 'Frete não pode ser negativo.',
      })
      .optional(),
  })
  .refine(
    data =>
      data.categoryId !== undefined ||
      data.name !== undefined ||
      data.slug !== undefined ||
      data.sku !== undefined ||
      data.description !== undefined ||
      data.active !== undefined ||
      data.featured !== undefined ||
      data.position !== undefined ||
      data.productionDays !== undefined ||
      data.shippingType !== undefined ||
      data.shippingPrice !== undefined,
    {
      error: 'Informe pelo menos um campo para atualizar.',
    },
  );

export type UpdateProductData = z.infer<typeof updateProductSchema>;
