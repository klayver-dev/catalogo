const validationErrorResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Dados inválidos.',
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: {
            type: ['string', 'number', 'null'],
          },
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

const unauthorizedResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Não autorizado.',
    },
    data: {
      type: 'null',
    },
  },
};

const internalErrorResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Erro interno do servidor.',
    },
    data: {
      type: 'null',
    },
  },
};

const productSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    categoryId: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    slug: {
      type: 'string',
    },
    sku: {
      type: ['string', 'null'],
    },
    description: {
      type: ['string', 'null'],
    },
    active: {
      type: 'boolean',
    },
    featured: {
      type: 'boolean',
    },
    position: {
      type: 'integer',
    },
    productionDays: {
      type: ['integer', 'null'],
    },
    shippingType: {
      type: 'string',
      enum: ['FIXED', 'QUOTE'],
    },
    shippingPrice: {
      type: ['integer', 'null'],
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export const createProductRouteSchema = {
  summary: 'Criar produto',
  description: 'Cria um novo produto.',
  tags: ['Products'],
  body: {
    type: 'object',
    required: ['categoryId', 'name', 'slug'],
    properties: {
      categoryId: {
        type: 'string',
        format: 'uuid',
      },
      name: {
        type: 'string',
      },
      slug: {
        type: 'string',
      },
      sku: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      active: {
        type: 'boolean',
      },
      featured: {
        type: 'boolean',
      },
      position: {
        type: 'integer',
      },
      productionDays: {
        type: 'integer',
      },
      shippingType: {
        type: 'string',
        enum: ['FIXED', 'QUOTE'],
      },
      shippingPrice: {
        type: 'integer',
      },
    },
  },
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
            product: productSchema,
          },
        },
      },
    },
    400: validationErrorResponse,
    401: unauthorizedResponse,
    500: internalErrorResponse,
  },
};

export const findAllProductsRouteSchema = {
  summary: 'Listar produtos',
  description: 'Retorna todos os produtos.',
  tags: ['Products'],
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
            products: {
              type: 'array',
              items: productSchema,
            },
          },
        },
      },
    },
    500: internalErrorResponse,
  },
};

export const findProductRouteSchema = {
  summary: 'Buscar produto',
  description: 'Busca um produto pelo ID.',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
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
            product: productSchema,
          },
        },
      },
    },
    404: {
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
    500: internalErrorResponse,
  },
};

export const updateProductRouteSchema = {
  summary: 'Atualizar produto',
  description: 'Atualiza um produto existente.',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      categoryId: {
        type: 'string',
        format: 'uuid',
      },
      name: {
        type: 'string',
      },
      slug: {
        type: 'string',
      },
      sku: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      active: {
        type: 'boolean',
      },
      featured: {
        type: 'boolean',
      },
      position: {
        type: 'integer',
      },
      productionDays: {
        type: 'integer',
      },
      shippingType: {
        type: 'string',
        enum: ['FIXED', 'QUOTE'],
      },
      shippingPrice: {
        type: 'integer',
      },
    },
  },
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
            product: productSchema,
          },
        },
      },
    },
    400: validationErrorResponse,
    401: unauthorizedResponse,
    404: {
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
    500: internalErrorResponse,
  },
};

export const deleteProductRouteSchema = {
  summary: 'Excluir produto',
  description: 'Exclui um produto pelo ID.',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
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
    401: unauthorizedResponse,
    404: {
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
    500: internalErrorResponse,
  },
};
