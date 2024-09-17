const express = require("express");
const { Pergunta, Questionario } = require("../models");
const autenticacaoJWT = require("../middlewares/autenticacaoJWT");
const router = express.Router();
const yup = require("yup");

// Validação de perguntas com Yup
const perguntaSchema = yup.object({
  descricao: yup.string().required(),
  tipo: yup.string().oneOf(["multiplaEscolha", "verdadeiroOuFalso"]).required(),
  opcoes: yup.array().when("tipo", {
    is: "multiplaEscolha",
    then: yup.array().of(yup.string().required()).min(2),
    otherwise: yup.array().notRequired(),
  }),
});

/**
 * @swagger
 * tags:
 *   name: Perguntas
 *   description: Operações relacionadas a perguntas
 */

/**
 * @swagger
 * /questionarios/{id}/perguntas:
 *   post:
 *     summary: Adiciona perguntas a um questionário existente
 *     description: Adiciona perguntas ao questionário por ID. Requer autenticação JWT.
 *     tags: [Perguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do questionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               perguntas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     descricao:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                       enum: [multiplaEscolha, verdadeiroOuFalso]
 *                     opcoes:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Perguntas adicionadas com sucesso
 *       404:
 *         description: Questionário não encontrado
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado, JWT inválido ou ausente
 */

// Adicionar perguntas ao questionário
router.post("/:id/perguntas", autenticacaoJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { perguntas } = req.body;

    // Verificar se o questionário existe
    const questionario = await Questionario.findByPk(id);
    if (!questionario) {
      return res.status(404).json({ error: "Questionário não encontrado" });
    }

    // Criar e associar perguntas ao questionário
    const perguntasCriadas = await Promise.all(
      perguntas.map(async (pergunta) => {
        await perguntaSchema.validate(pergunta); // Validação da pergunta
        return Pergunta.create({
          descricao: pergunta.descricao,
          tipo: pergunta.tipo,
          opcoes: pergunta.opcoes,
          questionario_id: id,  // Associar ao questionário
        });
      })
    );

    res.status(201).json(perguntasCriadas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
