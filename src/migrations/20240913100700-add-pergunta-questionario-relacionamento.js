module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.describeTable('perguntas');

    if (!tableExists['questionario_id']) {
      return queryInterface.addColumn('perguntas', 'questionario_id', {
        type: Sequelize.INTEGER,
        references: { model: 'questionarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('perguntas', 'questionario_id');
  },
};
