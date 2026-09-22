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
  description: 'Recurso não encontrado.',
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

const productOptionGroupSchema = {
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
    optionGroupId: {
      type: 'string',
      format: 'uuid',
    },
    position: {
      type: 'integer',
    },
    required: {
      type: 'boolean',
    },
    multiple: {
      type: 'boolean',
    },
  },
};

export const createProductOptionGroupRouteSchema = {
  tags: ['Product Option Groups'],
  summary: 'Vincular grupo de opções ao produto',
  description: 'Vincula um grupo de opções a um produto.',
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
    required: ['optionGroupId'],
    properties: {
      optionGroupId: {
        type: 'string',
        format: 'uuid',
      },
      position: {
        type: 'integer',
        minimum: 0,
      },
      required: {
        type: 'boolean',
      },
      multiple: {
        type: 'boolean',
      },
    },
  },
  response: {
    201: {
      description: 'Grupo de opções vinculado ao produto com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            productOptionGroup: productOptionGroupSchema,
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

export const findAllProductOptionGroupsRouteSchema = {
  tags: ['Product Option Groups'],
  summary: 'Listar grupos de opções do produto',
  description: 'Retorna os grupos de opções vinculados ao produto.',
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
      description: 'Grupos de opções do produto encontrados.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            productOptionGroups: {
              type: 'array',
              items: productOptionGroupSchema,
            },
          },
        },
      },
    },
    404: notFoundResponse,
    500: internalErrorResponse,
  },
};

export const updateProductOptionGroupRouteSchema = {
  tags: ['Product Option Groups'],
  summary: 'Atualizar grupo de opções do produto',
  description: 'Atualiza as configurações de um grupo de opções vinculado ao produto.',
  params: {
    type: 'object',
    required: ['productId', 'optionGroupId'],
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
      optionGroupId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      position: {
        type: 'integer',
        minimum: 0,
      },
      required: {
        type: 'boolean',
      },
      multiple: {
        type: 'boolean',
      },
    },
  },
  response: {
    200: {
      description: 'Grupo de opções do produto atualizado com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            productOptionGroup: productOptionGroupSchema,
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

export const deleteProductOptionGroupRouteSchema = {
  tags: ['Product Option Groups'],
  summary: 'Remover grupo de opções do produto',
  description: 'Remove o vínculo entre o grupo de opções e o produto.',
  params: {
    type: 'object',
    required: ['productId', 'optionGroupId'],
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
      optionGroupId: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
  response: {
    200: {
      description: 'Grupo de opções removido do produto com sucesso.',
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
