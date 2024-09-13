'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionario extends Model {
    static associate(models) {
      // Um Questionario pode ter muitas Perguntas
      Questionario.hasMany(models.Pergunta, {
        foreignKey: 'questionario_id',
        as: 'perguntas',
      });
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
