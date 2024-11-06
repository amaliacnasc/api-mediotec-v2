const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Token inválido, autorização negada' });
  }
 

  const token = authHeader.split(' ')[1];
  if (!token) {

    
    return res.status(401).json({ message: 'Token inválido, autorização negada' });
  }

  try {
    console.log(token)
    const decoded = jwt.verify(token, config.secret);
    req.user = await prisma.user.findUnique({
      where: { userId: decoded.userId },
    });

    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifica permissões com base na role
    const { role } = req.user;
    const resource = req.path.split('/')[2]; // Exemplo: captura 'comunicados' ou 'conceitos'
    const isOwner = async () => {
      // Função para verificar se o usuário é o criador do recurso (para PUT e DELETE)
      const itemId = req.params.id;
      const item = await prisma[resource].findUnique({ where: { id: itemId } });
      return item && item.creatorId === req.user.id;
    };

    if (role === 'COORDINATOR') {

      return next();
    }

    if (role === 'TEACHER') {
      if (req.method === 'POST' && (resource === 'Announcement' || resource === 'Conceito')) {
        return next();
      }

      if ((req.method === 'PUT' || req.method === 'DELETE') && (resource === 'Announcement' || resource === 'Conceito')) {
        if (await isOwner()) {
          return next();
        }
        return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
      }

      return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
    }

    if (role === 'STUDENT') {
      if (req.method === 'GET') {
        if (resource === 'conceitos') {
          req.query.userId = req.user.id; // Restringe consulta ao próprio conceito
        }
        return next();
      }
      return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
    }

    return res.status(403).json({ message: 'Acesso negado' });
  } catch (error) {
    res.status(401).json({ message: 'O token não é válido' });
    console.log(error)
  }
};
