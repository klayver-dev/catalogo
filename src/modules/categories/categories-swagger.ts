import type { FastifySchema } from 'fastify';

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
  description: 'Usuário não autenticado.',
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

const categorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    slug: {
      type: 'string',
    },
    active: {
      type: 'boolean',
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

export const createCategoryRouteSchema: FastifySchema = {
  summary: 'Criar categoria',
  description: 'Cria uma nova categoria.',
  tags: ['Categories'],

  body: {
    type: 'object',
    required: ['name', 'slug'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      slug: {
        type: 'string',
        minLength: 2,
      },
    },
  },

  response: {
    201: {
      description: 'Categoria criada com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            category: categorySchema,
          },
        },
      },
    },

    400: validationErrorResponse,

    401: unauthorizedResponse,

    500: internalErrorResponse,
  },
};

export const findAllCategoriesRouteSchema: FastifySchema = {
  summary: 'Listar categorias',
  description: 'Retorna todas as categorias.',
  tags: ['Categories'],

  response: {
    200: {
      description: 'Categorias encontradas.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            categories: {
              type: 'array',
              items: categorySchema,
            },
          },
        },
      },
    },

    500: internalErrorResponse,
  },
};

export const findCategoryRouteSchema: FastifySchema = {
  summary: 'Obter categoria',
  description: 'Retorna uma categoria pelo ID.',
  tags: ['Categories'],

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
      },
    },
  },

  response: {
    200: {
      description: 'Categoria encontrada.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            category: categorySchema,
          },
        },
      },
    },

    404: {
      description: 'Categoria não encontrada.',
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

export const updateCategoryRouteSchema: FastifySchema = {
  summary: 'Atualizar categoria',
  description: 'Atualiza os dados de uma categoria.',
  tags: ['Categories'],

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
      },
    },
  },

  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      slug: {
        type: 'string',
        minLength: 2,
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
      description: 'Categoria atualizada com sucesso.',
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
          properties: {
            category: categorySchema,
          },
        },
      },
    },

    400: validationErrorResponse,

    401: unauthorizedResponse,

    404: {
      description: 'Categoria não encontrada.',
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

export const deleteCategoryRouteSchema: FastifySchema = {
  summary: 'Excluir categoria',
  description: 'Exclui uma categoria pelo ID.',
  tags: ['Categories'],

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
      },
    },
  },

  response: {
    200: {
      description: 'Categoria excluída com sucesso.',
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
      description: 'Categoria não encontrada.',
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
