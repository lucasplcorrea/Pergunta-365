'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionario extends Model {
    static associate(models) {
      // Define associations
      Questionario.belongsTo(models.Usuario, { foreignKey: 'createdBy', as: 'creator' });
      Questionario.belongsTo(models.Usuario, { foreignKey: 'updatedBy', as: 'updater' });
      Questionario.hasMany(models.Pergunta, { foreignKey: 'questionario_id', as: 'perguntas' });
    }
  }
  Questionario.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Questionario',
    tableName: 'questionarios',
  });
  return Questionario;
};
