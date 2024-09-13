module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuario_permissao', {
      usuario_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permissao_id: {
        type: Sequelize.INTEGER,
        references: { model: 'permissoes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuario_permissao');
  },
};
