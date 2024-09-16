'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissao extends Model {
    static associate(models) {
      Permissao.belongsToMany(models.Papel, {
        through: 'papel_permissao',
        foreignKey: 'permissaoId',
        as: 'papeis'
      });
    }
  }
  Permissao.init({
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Permissao',
    tableName: 'permissoes'
  });
  return Permissao;
};
