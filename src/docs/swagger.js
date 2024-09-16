const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Poll 365',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.js'], // Define onde buscar os comentários JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
