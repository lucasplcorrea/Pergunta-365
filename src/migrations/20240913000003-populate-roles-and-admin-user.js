'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserir roles padrão
    await queryInterface.bulkInsert('roles', [
      { id: 1, nome: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nome: 'Criador', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nome: 'Estudante', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Criar usuário admin
    await queryInterface.bulkInsert('usuarios', [
      {
        id: 1,
        nome: 'Admin',
        email: 'admin@example.com',
        senha: 'admin123', // Criptografar senha em produção
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Inserir permissões para as roles
    await queryInterface.bulkInsert('permissoes', [
      {
        id: 1,
        nome: 'Administrador',
        criar_questionarios: true,
        adicionar_perguntas: true,
        responder_perguntas: true,
        editar_usuarios: true,
        remover_usuarios: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: 'Criador',
        criar_questionarios: true,
        adicionar_perguntas: true,
        responder_perguntas: true,
        editar_usuarios: false,
        remover_usuarios: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nome: 'Estudante',
        criar_questionarios: false,
        adicionar_perguntas: false,
        responder_perguntas: true,
        editar_usuarios: false,
        remover_usuarios: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Deletar dados inseridos
    await queryInterface.bulkDelete('usuarios', { id: 1 });
    await queryInterface.bulkDelete('roles', null);
    await queryInterface.bulkDelete('permissoes', null);
  }
};
