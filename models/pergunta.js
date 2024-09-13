'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pergunta extends Model {
    static associate(models) {
      // define association here
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
