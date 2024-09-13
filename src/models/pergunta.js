'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pergunta extends Model {
    static associate(models) {
      // Pergunta pertence a um Questionario
      Pergunta.belongsTo(models.Questionario, {
        foreignKey: 'questionario_id',
        as: 'questionario',
      });
    }
  }
  Pergunta.init({
    descricao: DataTypes.STRING,
    questionario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pergunta',
    tableName: 'perguntas', // Nome da tabela em minúsculas
  });
  return Pergunta;
};
