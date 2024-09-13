const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Permissao } = require('../models'); // Atualizar com o caminho correto do modelo
const router = express.Router();
const yup = require('yup');

// Validação com Yup
const usuarioSchema = yup.object({
  nome: yup.string().required(),
  sobrenome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().min(6).required(),
  permissao: yup.string().oneOf(['criador', 'estudante']).required(),
});

// Criar usuário
router.post('/', async (req, res) => {
  try {
    const { nome, sobrenome, email, senha, permissao } = req.body;
    
    // Validação
    await usuarioSchema.validate(req.body);

    // Hash de senha
    const senhaHashed = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const usuario = await Usuario.create({
      nome, sobrenome, email, senha: senhaHashed,
    });

    // Adicionar permissão
    const permissaoObj = await Permissao.findOne({ where: { nome: permissao } });
    await usuario.addPermissao(permissaoObj);

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os usuários
router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

// Autenticação e geração de token JWT
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return res.status(400).send('Email ou senha inválidos.');
  }

  // Gerar JWT
  const token = jwt.sign({ id: usuario.id, permissao: usuario.permissao }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;
