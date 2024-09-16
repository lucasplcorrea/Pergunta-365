const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario, Permissao } = require("../models"); // Atualizar com o caminho correto do modelo
const router = express.Router();
const yup = require("yup");

// Validação com Yup (removido o campo sobrenome)
const usuarioSchema = yup.object({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().min(6).required(),
  permissao: yup.number().oneOf([2, 3]).required(),
});

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - permissao
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *               permissao:
 *                 type: integer
 *                 description: ID da permissão (2 = Criador, 3 = Estudante)
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar o usuário
 */

// Criar usuário
router.post("/", async (req, res) => {
  try {
    const { nome, email, senha, permissao } = req.body;

    // Validação
    await usuarioSchema.validate(req.body);

    // Hash de senha
    const senhaHashed = await bcrypt.hash(senha, 10);

    // Verificar se a permissão existe
    const permissaoObj = await Permissao.findByPk(permissao); // Buscar pela primary key (ID)
    if (!permissaoObj) {
      return res.status(400).json({ error: "Permissão inválida" });
    }

    // Criar novo usuário já vinculando com o role_id
    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHashed,
      role_id: permissaoObj.id, // Vincula o role_id
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Sucesso ao listar usuários
 *       500:
 *         description: Erro no servidor
 */

// Listar todos os usuários
router.get("/", async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autentica o usuário e gera um token JWT
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login bem-sucedido, JWT retornado
 *       400:
 *         description: Email ou senha inválidos
 */

// Autenticação e geração de token JWT
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return res.status(400).send("Email ou senha inválidos.");
  }

  // Gerar JWT
  const token = jwt.sign(
    { id: usuario.id, permissao: usuario.permissao },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
});

module.exports = router;
