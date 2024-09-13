'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Papel extends Model {
    static associate(models) {
      Papel.belongsToMany(models.Permissao, {
        through: 'papel_permissao',
        foreignKey: 'papelId',
        as: 'permissoes'
      });
      Papel.belongsToMany(models.Usuario, {
        through: 'usuario_papel',
        foreignKey: 'papelId',
        as: 'usuarios'
      });
    }
  }
  Papel.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Papel',
    tableName: 'papeis'
  });
  return Papel;
};
