const http = require("http"); 
const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client'); // Importando o Prisma Client

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
