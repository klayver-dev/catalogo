const productImageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    productId: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    alt: {
      type: 'string',
    },
    position: {
      type: 'integer',
    },
    createdAt: {
      type: 'string',
    },
  },
};

const validationErrorSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: {},
          message: {
            type: 'string',
          },
        },
      },
    },
    data: {
      type: 'null',
    },
  },
};

export const createProductImageRouteSchema = {
  tags: ['Product Images'],
  consumes: ['multipart/form-data'],
  response: {
    201: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            productImage: productImageSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const findAllProductImagesRouteSchema = {
  tags: ['Product Images'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            productImages: {
              type: 'array',
              items: productImageSchema,
            },
          },
        },
      },
    },
  },
};

export const updateProductImageRouteSchema = {
  tags: ['Product Images'],
  consumes: ['multipart/form-data'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            productImage: productImageSchema,
          },
        },
      },
    },
    400: validationErrorSchema,
  },
};

export const deleteProductImageRouteSchema = {
  tags: ['Product Images'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'null',
        },
      },
    },
  },
};
