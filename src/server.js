require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');

app.use(express.json());

// Importando rotas (a ser implementadas)
const usuariosRoutes = require('./routes/usuarios');
const questionariosRoutes = require('./routes/questionarios');
const respostasRoutes = require('./routes/respostas');

// Usando as rotas
app.use('/usuarios', usuariosRoutes);
app.use('/questionarios', questionariosRoutes);
app.use('/respostas', respostasRoutes);

// Documentação da API com Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Servidor rodando
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
