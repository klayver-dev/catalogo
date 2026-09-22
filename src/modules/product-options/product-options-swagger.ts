const productOptionSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    productId: { type: 'string' },
    optionId: { type: 'string' },
    active: { type: 'boolean' },
    additionalPrice: { type: 'integer' },
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

export const createProductOptionRouteSchema = {
  tags: ['Product Options'],
  body: {
    type: 'object',
    required: ['optionId'],
    properties: {
      optionId: { type: 'string' },
      active: { type: 'boolean' },
      additionalPrice: { type: 'integer', minimum: 0 },
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
            productOption: productOptionSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const findAllProductOptionsRouteSchema = {
  tags: ['Product Options'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            productOptions: {
              type: 'array',
              items: productOptionSchema,
            },
          },
        },
      },
    },
  },
};

export const updateProductOptionRouteSchema = {
  tags: ['Product Options'],
  body: {
    type: 'object',
    properties: {
      active: { type: 'boolean' },
      additionalPrice: { type: 'integer', minimum: 0 },
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
            productOption: productOptionSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const deleteProductOptionRouteSchema = {
  tags: ['Product Options'],
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
