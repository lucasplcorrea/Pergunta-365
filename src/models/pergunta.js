'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pergunta extends Model {
    static associate(models) {
      Pergunta.belongsTo(models.Questionario, {
        foreignKey: 'questionario_id',
        as: 'questionario',
      });
    }
  }
  Pergunta.init({
    descricao: DataTypes.STRING,
    questionario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'questionarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Pergunta',
    tableName: 'perguntas',
  });
  return Pergunta;
};
