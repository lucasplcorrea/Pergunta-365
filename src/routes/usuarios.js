const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario, Permissao } = require("../models");
const autenticacaoJWT = require("../middlewares/autenticacaoJWT"); // Middleware de autenticação
const verificaProprioUsuario = require("../middlewares/verificaProprioUsuario"); // Middleware para verificar usuário
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
 *     tags: [Cadastro e Login]
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
 * /usuarios/login:
 *   post:
 *     summary: Autentica o usuário e gera um token JWT
 *     tags: [Cadastro e Login]
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

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Rota de Usuários]
 *     responses:
 *       200:
 *         description: Sucesso ao listar usuários
 *       500:
 *         description: Erro no servidor
 */

// Listar todos os usuários (autenticado)
router.get("/", autenticacaoJWT, async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Rota de Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */

// Obter um usuário pelo ID (autenticado)
router.get("/:id", autenticacaoJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Rota de Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro no servidor
 */



// Atualizar um usuário (autenticado e verificado se é o próprio usuário)
router.put("/:id", [autenticacaoJWT, verificaProprioUsuario], async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    // Buscar o usuário
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualizar usuário
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) usuario.senha = await bcrypt.hash(senha, 10);

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Rota de Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */

// Deletar um usuário (autenticado e verificado se é o próprio usuário)
router.delete("/:id", [autenticacaoJWT, verificaProprioUsuario], async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await usuario.destroy();
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
