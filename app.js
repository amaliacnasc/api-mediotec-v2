const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client'); // Importando o Prisma Client
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config(); 

// Inicializando o cliente Prisma
const prisma = new PrismaClient();

// Criando a instância do Express
const app = express();

// Importando as rotas
const usuarios = require('./routes/userRoutes');
const disciplinas = require('./routes/courseRoutes'); 
const turmas = require('./routes/classRoute');
const notification = require('./routes/notificationRoute'); 
const conceito = require('./routes/conceitoRoute');
const turmaDisciplina = require('./routes/classCourseRoute');
const usuarioTurma = require('./routes/userClassRoute'); 
const usuarioDisciplina = require('./routes/userCourseRoute');

// Configurando as rotas
app.use('/mediotec/usuarios', usuarios); 
app.use('/mediotec/disciplinas', disciplinas);
app.use('/mediotec/turmas', turmas);
app.use('/mediotec/notificacoes', notification); 
app.use('/mediotec/conceitos', conceito);
app.use('/mediotec/turmaDisc', turmaDisciplina); 
app.use('/mediotec/turmaUsuario', usuarioTurma);
app.use('/mediotec/usuarioDisc', usuarioDisciplina); 



app.use(cors());
app.use(bodyParser.json()); 



// Configuração do Swagger
const options = {
  definition: {
    openapi: "3.0.0",  // Atualizado para OpenAPI 3.0.0 para melhor compatibilidade
    info: {
      title: "API - Mediotec",
      version: "1.0.0",
      description:
        "Mediotec é um sistema de gerenciamento escolar, que facilita a administração de usuários e dados escolares. O sistema utiliza Node.js, Express e Prisma para gerenciar dados em um banco de dados Postgres.",
      contact: {
        name: "Amalia Nascimento",
        url: "https://github.com/amaliacnasc",
        email: "amaliacnasc@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"] // Caminho para as rotas com documentação Swagger
};
const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

