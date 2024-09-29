const http = require("http"); 
const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); 
const helmet = require('helmet'); 
const bcrypt = require('bcrypt');
const authMiddleware = require('./middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client'); 

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
const usuarios = require('./routes/userRoutes');
const disciplinas = require('./routes/courseRoutes'); 
const turmas = require('./routes/classRoute');
const notification = require('./routes/notificationRoute'); 
const conceito = require('./routes/conceitoRoute');
//const loginRegistro = require('./routes/authRoute');
app.use('/mediotec/usuarios', usuarios); 
app.use('/mediotec/disciplinas',disciplinas);
app.use('/mediotec/turmas', turmas);
app.use('/mediotec/notificacoes', notification); 
app.use('/mediotec/conceitos', conceito);
//app.use('/auth', loginRegistro);