const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Token inválido, autorização negada' });
  }

  // Extrair o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token inválido, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = await prisma.user.findUnique({
      where: {
        userId: decoded.id, // Altere isso conforme necessário se a chave não for 'userId'
      },
    });

    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    if (req.method === 'POST' || req.method === 'GET') {
      if (req.user.role !== 'COORDINATOR' && req.user.role !== 'TEACHER') {
        return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
      }
      next();
    }

    if (req.method === 'DELETE' || req.method === 'PUT') {
      if (req.user.role !== 'COORDINATOR') {
        return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
      }
      next();
    }

  } catch (error) {
    res.status(401).json({ message: 'O token não é válido' });
  }
};
