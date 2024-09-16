const verificaProprioUsuario = (req, res, next) => {
    const { id } = req.params;
    
    // Comparar o ID do usuário logado com o ID passado na rota
    if (parseInt(id) !== req.usuario.id) {
      return res.status(403).json({ error: "Ação não permitida. Você só pode modificar o seu próprio perfil." });
    }
  
    next();
  };
  
  module.exports = verificaProprioUsuario;
  