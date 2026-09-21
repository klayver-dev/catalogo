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
  description: 'Grupo de opções não encontrado.',
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

const optionGroupSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    position: {
      type: 'integer',
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

export const createOptionGroupRouteSchema = {
  tags: ['Option Groups'],
  summary: 'Criar grupo de opções',
  description: 'Cria um novo grupo de opções.',
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
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
      description: 'Grupo de opções criado com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            optionGroup: optionGroupSchema,
          },
        },
      },
    },
    400: validationErrorResponse,
    401: unauthorizedResponse,
    500: internalErrorResponse,
  },
};

export const findAllOptionGroupsRouteSchema = {
  tags: ['Option Groups'],
  summary: 'Listar grupos de opções',
  description: 'Retorna todos os grupos de opções.',
  response: {
    200: {
      description: 'Grupos de opções encontrados.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            optionGroups: {
              type: 'array',
              items: optionGroupSchema,
            },
          },
        },
      },
    },
    500: internalErrorResponse,
  },
};

export const findOptionGroupRouteSchema = {
  tags: ['Option Groups'],
  summary: 'Buscar grupo de opções',
  description: 'Retorna um grupo de opções pelo ID.',
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
      description: 'Grupo de opções encontrado.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            optionGroup: optionGroupSchema,
          },
        },
      },
    },
    404: notFoundResponse,
    500: internalErrorResponse,
  },
};

export const updateOptionGroupRouteSchema = {
  tags: ['Option Groups'],
  summary: 'Atualizar grupo de opções',
  description: 'Atualiza um grupo de opções.',
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
      name: {
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
      description: 'Grupo de opções atualizado com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            optionGroup: optionGroupSchema,
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

export const deleteOptionGroupRouteSchema = {
  tags: ['Option Groups'],
  summary: 'Excluir grupo de opções',
  description: 'Exclui um grupo de opções.',
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
      description: 'Grupo de opções excluído com sucesso.',
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
