const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Poll 365',
      version: '1.0.0',
      description: 'API para enquetes com autenticação JWT',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Define o formato do token
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Aplica a autenticação JWT por padrão em todas as rotas
      },
    ],
  },
  apis: ['src/routes/*.js'], // Caminho para os arquivos com anotações das rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
