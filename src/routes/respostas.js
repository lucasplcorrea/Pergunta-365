const express = require('express');
const { Resposta, Pergunta } = require('../models'); // Atualizar com o caminho correto do modelo
const router = express.Router();
const autenticacaoJWT = require('../middlewares/autenticacaoJWT');

// Responder a uma pergunta (somente estudantes)
router.post('/', autenticacaoJWT, async (req, res) => {
  if (req.usuario.permissao !== 'estudante') {
    return res.status(403).send('Permissão negada.');
  }

  const { conteudo, pergunta_id } = req.body;

  const pergunta = await Pergunta.findByPk(pergunta_id);
  if (!pergunta) return res.status(404).send('Pergunta não encontrada.');

  const resposta = await Resposta.create({
    conteudo,
    pergunta_id,
    usuario_id: req.usuario.id,
  });

  res.status(201).json(resposta);
});

// Listar todas as respostas de uma pergunta
router.get('/:pergunta_id', async (req, res) => {
  const respostas = await Resposta.findAll({
    where: { pergunta_id: req.params.pergunta_id },
  });
  res.json(respostas);
});

module.exports = router;
