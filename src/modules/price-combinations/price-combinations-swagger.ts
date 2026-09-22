const priceCombinationOptionSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    combinationId: { type: 'string' },
    optionId: { type: 'string' },
  },
};

const priceCombinationSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    priceTierId: { type: 'string' },
    priceInCents: { type: 'integer' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    options: {
      type: 'array',
      items: priceCombinationOptionSchema,
    },
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

export const createPriceCombinationRouteSchema = {
  tags: ['Price Combinations'],
  body: {
    type: 'object',
    required: ['optionIds', 'priceInCents'],
    properties: {
      optionIds: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
        },
      },
      priceInCents: {
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
            combination: priceCombinationSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const findAllPriceCombinationsRouteSchema = {
  tags: ['Price Combinations'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            combinations: {
              type: 'array',
              items: priceCombinationSchema,
            },
          },
        },
      },
    },
  },
};

export const updatePriceCombinationRouteSchema = {
  tags: ['Price Combinations'],
  body: {
    type: 'object',
    required: ['priceInCents'],
    properties: {
      priceInCents: {
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
            combination: priceCombinationSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const deletePriceCombinationRouteSchema = {
  tags: ['Price Combinations'],
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
