module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Poll 365',
      version: '1.0.0',
    },
    paths: {
      '/perguntas': {
        get: {
          summary: 'Obter todas as perguntas',
          responses: {
            '200': {
              description: 'Lista de perguntas',
            },
          },
        },
        post: {
          summary: 'Criar uma nova pergunta',
          responses: {
            '201': {
              description: 'Pergunta criada',
            },
          },
        },
      },
      // Adicionar outros caminhos e definições de API conforme necessário
    },
  };
  