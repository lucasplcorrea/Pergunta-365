const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  if (!token) return res.status(401).send('Acesso negado. Token não fornecido.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(400).send('Token inválido.');
  }
};
