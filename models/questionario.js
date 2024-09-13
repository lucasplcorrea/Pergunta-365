'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionario extends Model {
    static associate(models) {
      // define association here
    }
  }
  Questionario.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Questionario',
    tableName: 'questionarios', // Nome da tabela em minúsculas
  });
  return Questionario;
};
