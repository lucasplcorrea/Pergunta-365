const { Permissao } = require('../models');

module.exports = function(permission) {
  return async (req, res, next) => {
    // Acesso permitido apenas se o usuário tem a permissão
    const usuario = req.usuario; // Supondo que o middleware de autenticação já está populando req.usuario
    const permissoes = await Permissao.findAll({
      include: {
        model: Usuario,
        where: { id: usuario.id },
        attributes: []
      },
      attributes: ['nome']
    });

    const permissoesUsuario = permissoes.map(p => p.nome);
    if (permissoesUsuario.includes(permission)) {
      next();
    } else {
      res.status(403).send('Acesso negado. Permissão insuficiente.');
    }
  };
};
