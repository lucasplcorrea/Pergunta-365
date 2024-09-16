const jwt = require("jsonwebtoken");

const autenticacaoJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    const payload = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.usuario = payload; // Adiciona os dados do usuário logado à requisição
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido." });
  }
};

module.exports = autenticacaoJWT;