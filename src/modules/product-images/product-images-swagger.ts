const validationErrorResponse = {
  description: 'Dados inválidos.',
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
          field: {
            type: 'string',
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
  description: 'Não autorizado.',
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    data: {
      type: 'null',
    },
  },
};

const notFoundResponse = {
  description: 'Imagem ou produto não encontrado.',
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    data: {
      type: 'null',
    },
  },
};

const internalErrorResponse = {
  description: 'Erro interno do servidor.',
};

const productImageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    productId: {
      type: 'string',
      format: 'uuid',
    },
    url: {
      type: 'string',
    },
    alt: {
      type: 'string',
      nullable: true,
    },
    position: {
      type: 'integer',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export const createProductImageRouteSchema = {
  tags: ['Product Images'],
  summary: 'Adicionar imagem ao produto',
  description: 'Adiciona uma imagem a um produto.',
  params: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  body: {
    type: 'object',
    required: ['url'],
    properties: {
      url: {
        type: 'string',
      },
      alt: {
        type: 'string',
      },
      position: {
        type: 'integer',
        minimum: 0,
      },
    },
  },
  response: {
    201: {
      description: 'Imagem adicionada com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            image: productImageSchema,
          },
        },
      },
    },
    400: validationErrorResponse,
    401: unauthorizedResponse,
    404: notFoundResponse,
    500: internalErrorResponse,
  },
};

export const findAllProductImagesRouteSchema = {
  tags: ['Product Images'],
  summary: 'Listar imagens do produto',
  description: 'Retorna todas as imagens de um produto.',
  params: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    200: {
      description: 'Imagens encontradas.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            images: {
              type: 'array',
              items: productImageSchema,
            },
          },
        },
      },
    },
    404: notFoundResponse,
    500: internalErrorResponse,
  },
};

export const updateProductImageRouteSchema = {
  tags: ['Product Images'],
  summary: 'Atualizar imagem do produto',
  description: 'Atualiza os dados de uma imagem do produto.',
  params: {
    type: 'object',
    required: ['productId', 'imageId'],
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
      imageId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
      },
      alt: {
        type: 'string',
      },
      position: {
        type: 'integer',
        minimum: 0,
      },
    },
  },
  response: {
    200: {
      description: 'Imagem atualizada com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            image: productImageSchema,
          },
        },
      },
    },
    400: validationErrorResponse,
    401: unauthorizedResponse,
    404: notFoundResponse,
    500: internalErrorResponse,
  },
};

export const deleteProductImageRouteSchema = {
  tags: ['Product Images'],
  summary: 'Excluir imagem do produto',
  description: 'Exclui uma imagem de um produto.',
  params: {
    type: 'object',
    required: ['productId', 'imageId'],
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
      imageId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    200: {
      description: 'Imagem excluída com sucesso.',
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
    404: notFoundResponse,
    500: internalErrorResponse,
  },
};
