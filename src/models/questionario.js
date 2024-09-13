'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionario extends Model {
    static associate(models) {
      // define association here
      Questionario.belongsTo(models.Usuario, { foreignKey: 'createdBy', as: 'creator' });
      Questionario.belongsTo(models.Usuario, { foreignKey: 'updatedBy', as: 'updater' });
    }
  }
  Questionario.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Questionario',
    tableName: 'questionarios',
  });
  return Questionario;
};
