const express = require("express");
const { Questionario } = require("../models");
const autenticacaoJWT = require("../middlewares/autenticacaoJWT");
const router = express.Router();
const yup = require("yup");

// Validação de questionário com Yup
const questionarioSchema = yup.object({
  titulo: yup.string().required(),
  descricao: yup.string().optional(),
});

/**
 * @swagger
 * tags:
 *   name: Questionários
 *   description: Operações relacionadas a questionários
 */

/**
 * @swagger
 * /questionarios:
 *   post:
 *     summary: Cria um novo questionário
 *     description: Cria um novo questionário. Requer autenticação JWT.
 *     tags: [Questionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do questionário
 *                 example: "Pesquisa Eleitoral 2024"
 *               descricao:
 *                 type: string
 *                 description: Descrição do questionário
 *                 example: "Questionário para entender o cenário eleitoral"
 *     responses:
 *       201:
 *         description: Questionário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do questionário
 *                 titulo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado, JWT inválido ou ausente
 *     security:
 *       - bearerAuth: []
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Criar questionário
router.post("/", autenticacaoJWT, async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    // Validação
    await questionarioSchema.validate(req.body);

    // Criar questionário
    const questionario = await Questionario.create({
      titulo,
      descricao,
      createdBy: req.usuario.id,  // Atribuir o criador
      updatedBy: req.usuario.id   // Atualizador inicial
    });

    res.status(201).json(questionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
