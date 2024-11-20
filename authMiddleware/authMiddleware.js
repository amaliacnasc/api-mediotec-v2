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
    const decoded = jwt.verify(token, config.secret);
    req.user = await prisma.user.findUnique({
      where: { userId: decoded.userId },
    });

    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const { role } = req.user;
    const resource = req.path.split('/')[2]; // Exemplo: captura 'users', 'classes', etc.

    if (role === 'COORDINATOR') {
      // Coordenadores têm acesso total
      return next();
    }

    if (role === 'TEACHER') {
      if (req.method === 'GET') {
        if (['users', 'classes', 'courses'].includes(resource)) {
          return next();
        }
      }
      if (req.method === 'POST' && ['conceitos', 'announcements'].includes(resource)) {
        return next();
      }

      if ((req.method === 'PUT' || req.method === 'DELETE') && ['announcements'].includes(resource)) {
        // Verifica se o professor é o criador do anúncio
        const item = await prisma.announcement.findUnique({
          where: { announcementId: req.params.id },
        });
        if (item && item.userId === req.user.userId) {
          return next();
        }
      }

      return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
    }

    if (role === 'STUDENT') {
      if (req.method === 'GET') {
        if (resource === 'users' && req.params.id === req.user.userId) {
          // Alunos só podem acessar seu próprio perfil
          return next();
        }
        if (resource === 'classes') {
          // Restringe acesso à turma do aluno
          const classData = await prisma.userClassCourse.findFirst({
            where: { userId: req.user.userId },
            include: { class: true },
          });
          if (classData) {
            req.query.classId = classData.classId;
            return next();
          }
        }
        if (resource === 'courses') {
          // Restringe acesso às disciplinas em que o aluno está matriculado
          req.query.userId = req.user.userId;
          return next();
        }
        if (resource === 'conceitos') {
          // Restringe acesso aos próprios conceitos
          req.query.userId = req.user.userId;
          return next();
        }
      }

      return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
    }

    return res.status(403).json({ message: 'Acesso negado' });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'O token não é válido' });
  }
};
