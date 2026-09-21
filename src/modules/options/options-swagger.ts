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
  description: 'Opção não encontrada.',
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

const optionSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    optionGroupId: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    position: {
      type: 'integer',
    },
    active: {
      type: 'boolean',
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

export const createOptionRouteSchema = {
  tags: ['Options'],
  summary: 'Criar opção',
  description: 'Cria uma nova opção.',
  body: {
    type: 'object',
    required: ['optionGroupId', 'name'],
    properties: {
      optionGroupId: {
        type: 'string',
        format: 'uuid',
      },
      name: {
        type: 'string',
      },
      position: {
        type: 'integer',
        minimum: 0,
      },
      active: {
        type: 'boolean',
      },
    },
  },
  response: {
    201: {
      description: 'Opção criada com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            option: optionSchema,
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

export const findAllOptionsRouteSchema = {
  tags: ['Options'],
  summary: 'Listar opções',
  description: 'Retorna todas as opções.',
  response: {
    200: {
      description: 'Opções encontradas.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            options: {
              type: 'array',
              items: optionSchema,
            },
          },
        },
      },
    },
    500: internalErrorResponse,
  },
};

export const findOptionRouteSchema = {
  tags: ['Options'],
  summary: 'Buscar opção',
  description: 'Retorna uma opção pelo ID.',
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
      description: 'Opção encontrada.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            option: optionSchema,
          },
        },
      },
    },
    404: notFoundResponse,
    500: internalErrorResponse,
  },
};

export const updateOptionRouteSchema = {
  tags: ['Options'],
  summary: 'Atualizar opção',
  description: 'Atualiza uma opção.',
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
      optionGroupId: {
        type: 'string',
        format: 'uuid',
      },
      name: {
        type: 'string',
      },
      position: {
        type: 'integer',
        minimum: 0,
      },
      active: {
        type: 'boolean',
      },
    },
  },
  response: {
    200: {
      description: 'Opção atualizada com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            option: optionSchema,
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

export const deleteOptionRouteSchema = {
  tags: ['Options'],
  summary: 'Excluir opção',
  description: 'Exclui uma opção.',
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
      description: 'Opção excluída com sucesso.',
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
