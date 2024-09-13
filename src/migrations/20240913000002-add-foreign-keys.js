'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adicionar foreign keys
    await queryInterface.addColumn('usuarios', 'role_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
      }
    });

    await queryInterface.addColumn('questionarios', 'createdBy', {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    });

    await queryInterface.addColumn('questionarios', 'updatedBy', {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    });

    await queryInterface.addColumn('perguntas', 'questionario_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'questionarios',
        key: 'id'
      }
    });

    await queryInterface.addColumn('respostas', 'pergunta_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'perguntas',
        key: 'id'
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    // Remover foreign keys
    await queryInterface.removeColumn('permissoes', 'role_id');
    await queryInterface.removeColumn('respostas', 'pergunta_id');
    await queryInterface.removeColumn('perguntas', 'questionario_id');
    await queryInterface.removeColumn('questionarios', 'updatedBy');
    await queryInterface.removeColumn('questionarios', 'createdBy');
    await queryInterface.removeColumn('usuarios', 'role_id');
  }
};
