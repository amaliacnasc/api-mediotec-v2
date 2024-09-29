const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extrair o token do cabeçalho
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Decodificar o token JWT
        const decoded = jwt.verify(token, config.secret);

        // Encontrar o usuário no banco de dados pelo userId do token
        const user = await prisma.user.findUnique({
            where: { userId: decoded.userId }
        });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }

        // Adicionar o usuário à requisição
        req.user = user;

        // Verificação adicional para POST nas rotas específicas e se o usuário não for COORDINATOR
        if (req.method === 'POST' && req.user.role !== 'COORDINATOR') {
            // Verifica se o path começa com /mediotec/usuarios, /mediotec/disciplinas, ou /mediotec/turmas
            if (
                req.path.startsWith('/mediotec/usuarios') ||
                req.path.startsWith('/mediotec/disciplinas') ||
                req.path.startsWith('/mediotec/turmas')
            ) {
                return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
            }
        }

        // Passa para a próxima função
        next();
    } catch (error) {
        // Retorna erro se o token for inválido
        return res.status(401).json({ message: 'Token is not valid', error: error.message });
    }
};
