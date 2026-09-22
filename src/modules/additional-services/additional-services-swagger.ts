const additionalServiceSchema = {
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

export const createAdditionalServiceRouteSchema = {
  tags: ['Additional Services'],

  body: {
    type: 'object',
    required: ['name', 'priceInCents'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      description: {
        type: 'string',
      },
      priceInCents: {
        type: 'integer',
        minimum: 0,
      },
      active: {
        type: 'boolean',
      },
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
            additionalService: additionalServiceSchema,
          },
        },
      },
    },

    400: validationErrorSchema,
  },
};

export const findAllAdditionalServicesRouteSchema = {
  tags: ['Additional Services'],

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            additionalServices: {
              type: 'array',
              items: additionalServiceSchema,
            },
          },
        },
      },
    },
  },
};

export const findAdditionalServiceByIdRouteSchema = {
  tags: ['Additional Services'],

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            additionalService: additionalServiceSchema,
          },
        },
      },
    },
  },
};

export const updateAdditionalServiceRouteSchema = {
  tags: ['Additional Services'],

  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      description: {
        type: 'string',
      },
      priceInCents: {
        type: 'integer',
        minimum: 0,
      },
      active: {
        type: 'boolean',
      },
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
            additionalService: additionalServiceSchema,
          },
        },
      },
    },

    400: validationErrorSchema,
  },
};

export const deleteAdditionalServiceRouteSchema = {
  tags: ['Additional Services'],

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
