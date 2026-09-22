const bannerSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    imageUrl: { type: 'string' },
    link: { type: 'string' },
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

export const createBannerRouteSchema = {
  tags: ['Banners'],

  consumes: ['multipart/form-data'],

  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            banner: bannerSchema,
          },
        },
      },
    },

    400: validationErrorSchema,
  },
};

export const findAllBannersRouteSchema = {
  tags: ['Banners'],

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            banners: {
              type: 'array',
              items: bannerSchema,
            },
          },
        },
      },
    },
  },
};

export const findBannerByIdRouteSchema = {
  tags: ['Banners'],

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            banner: bannerSchema,
          },
        },
      },
    },
  },
};

export const updateBannerRouteSchema = {
  tags: ['Banners'],

  consumes: ['multipart/form-data'],

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            banner: bannerSchema,
          },
        },
      },
    },

    400: validationErrorSchema,
  },
};

export const deleteBannerRouteSchema = {
  tags: ['Banners'],

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
