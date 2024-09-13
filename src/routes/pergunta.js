const express = require('express');
const router = express.Router();
const { Pergunta, Questionario } = require('../models');

// Criar Pergunta
router.post('/', async (req, res) => {
  try {
    const pergunta = await Pergunta.create(req.body);
    res.status(201).json(pergunta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter Perguntas
router.get('/', async (req, res) => {
  try {
    const perguntas = await Pergunta.findAll({
      include: {
        model: Questionario,
        as: 'questionario'
      }
    });
    res.status(200).json(perguntas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter Pergunta por ID
router.get('/:id', async (req, res) => {
  try {
    const pergunta = await Pergunta.findByPk(req.params.id, {
      include: {
        model: Questionario,
        as: 'questionario'
      }
    });
    if (pergunta) {
      res.status(200).json(pergunta);
    } else {
      res.status(404).json({ error: 'Pergunta não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Atualizar Pergunta
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Pergunta.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPergunta = await Pergunta.findByPk(req.params.id, {
        include: {
          model: Questionario,
          as: 'questionario'
        }
      });
      res.status(200).json(updatedPergunta);
    } else {
      res.status(404).json({ error: 'Pergunta não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar Pergunta
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pergunta.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Pergunta não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
