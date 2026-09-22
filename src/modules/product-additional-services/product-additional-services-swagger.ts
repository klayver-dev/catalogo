const productAdditionalServiceSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    productId: { type: 'string' },
    additionalServiceId: { type: 'string' },
    additionalService: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        priceInCents: { type: 'integer' },
        active: { type: 'boolean' },
        position: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
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

export const createProductAdditionalServiceRouteSchema = {
  tags: ['Product Additional Services'],

  body: {
    type: 'object',
    required: ['additionalServiceId'],
    properties: {
      additionalServiceId: {
        type: 'string',
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
            productAdditionalService: productAdditionalServiceSchema,
          },
        },
      },
    },

    400: validationErrorSchema,
  },
};

export const findAllProductAdditionalServicesRouteSchema = {
  tags: ['Product Additional Services'],

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            productAdditionalServices: {
              type: 'array',
              items: productAdditionalServiceSchema,
            },
          },
        },
      },
    },
  },
};

export const deleteProductAdditionalServiceRouteSchema = {
  tags: ['Product Additional Services'],

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
