const productPriceTierSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    productId: { type: 'string' },
    quantity: { type: 'integer' },
    calculationType: {
      type: 'string',
      enum: ['TOTAL', 'UNIT'],
    },
    priceInCents: { type: 'integer' },
    active: { type: 'boolean' },
    position: { type: 'integer' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

const validationErrorSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: {},
          message: { type: 'string' },
        },
      },
    },
    data: {
      type: 'null',
    },
  },
};

export const createProductPriceTierRouteSchema = {
  tags: ['Product Price Tiers'],
  body: {
    type: 'object',
    required: ['quantity', 'priceInCents'],
    properties: {
      quantity: { type: 'integer', minimum: 1 },
      calculationType: {
        type: 'string',
        enum: ['TOTAL', 'UNIT'],
      },
      priceInCents: {
        type: 'integer',
        minimum: 0,
      },
      active: { type: 'boolean' },
      position: {
        type: 'integer',
        minimum: 0,
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            priceTier: productPriceTierSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const findAllProductPriceTiersRouteSchema = {
  tags: ['Product Price Tiers'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            priceTiers: {
              type: 'array',
              items: productPriceTierSchema,
            },
          },
        },
      },
    },
  },
};

export const updateProductPriceTierRouteSchema = {
  tags: ['Product Price Tiers'],
  body: {
    type: 'object',
    properties: {
      quantity: {
        type: 'integer',
        minimum: 1,
      },
      calculationType: {
        type: 'string',
        enum: ['TOTAL', 'UNIT'],
      },
      priceInCents: {
        type: 'integer',
        minimum: 0,
      },
      active: { type: 'boolean' },
      position: {
        type: 'integer',
        minimum: 0,
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            priceTier: productPriceTierSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const deleteProductPriceTierRouteSchema = {
  tags: ['Product Price Tiers'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'null',
        },
      },
    },
  },
};
