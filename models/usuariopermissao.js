'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioPermissao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioPermissao.init({
    usuario_id: DataTypes.INTEGER,
    permissao_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuarioPermissao',
  });
  return UsuarioPermissao;
};