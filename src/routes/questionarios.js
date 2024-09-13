const express = require('express');
const { Questionario, Pergunta } = require('../models'); // Atualizar com o caminho correto do modelo
const router = express.Router();
const autenticacaoJWT = require('../middlewares/autenticacaoJWT');

// Criar questionário (somente criadores)
router.post('/', autenticacaoJWT, async (req, res) => {
  if (req.usuario.permissao !== 'criador') {
    return res.status(403).send('Permissão negada.');
  }

  const { titulo, descricao, perguntas } = req.body;
  const questionario = await Questionario.create({ titulo, descricao });

  // Adicionar perguntas
  if (perguntas && perguntas.length) {
    perguntas.forEach(async (pergunta) => {
      await Pergunta.create({ descricao: pergunta, questionario_id: questionario.id });
    });
  }

  res.status(201).json(questionario);
});

// Listar todos os questionários
router.get('/', async (req, res) => {
  const questionarios = await Questionario.findAll({ include: Pergunta });
  res.json(questionarios);
});

module.exports = router;
