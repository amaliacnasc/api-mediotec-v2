const http = require("http"); 
const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client'); // Importando o Prisma Client
const bcrypt = require('bcryptjs');


const app = express();

dotenv.config(); 

// Inicializando o cliente Prisma
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json()); 

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const authRoutes = require('./routes/authRoute');  // Novo - Rotas de autenticação
const usuarios = require('./routes/userRoutes');
const disciplinas = require('./routes/courseRoutes'); 
const turmas = require('./routes/classRoute');
const notification = require('./routes/notificationRoute'); 
const conceito = require('./routes/conceitoRoute');
const turmaDisciplina = require('./routes/classCourseRoute');
const usuarioTurma = require('./routes/userClassRoute'); 
const usuarioDisciplina = require('./routes/userCourseRoute');
const authMiddleware = require('./authMiddleware/authMiddleware')
app.use('/auth', authRoutes);  // Novo - Rotas de autenticação (ex.: /auth/login e /auth/register)
app.use('/mediotec/usuarios', usuarios); 
app.use('/mediotec/disciplinas',disciplinas);
app.use('/mediotec/turmas', turmas);
app.use('/mediotec/notificacoes', notification); 
app.use('/mediotec/conceitos', conceito);
app.use('/mediotec/turmaDisc', turmaDisciplina ); 
app.use('/mediotec/turmaUsuario', usuarioTurma);
app.use('/mediotec/usuarioDisc', usuarioDisciplina); 