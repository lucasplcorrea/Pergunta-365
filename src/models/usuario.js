'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Associa o usuário diretamente a uma permissão (role)
      Usuario.belongsTo(models.Permissao, {
        foreignKey: 'role_id', // A coluna que vai armazenar a permissão do usuário
        as: 'permissao' // Alias para facilitar na hora de buscar a permissão
      });
    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    role_id: DataTypes.INTEGER // Definir a coluna role_id no modelo
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  });
  return Usuario;
};
