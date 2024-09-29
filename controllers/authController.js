/*const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10; //nivel de dificuldade do hash 

// POST
exports.register = async (req, res) => {
    try {
        const {
            name, cpf, email, password, phone,
            dateOfBirth, role, image, gender,
            familyContact, affiliation
        } = req.body;

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, saltRounds);

  
        const user = await prisma.user.create({
            data: {
                name,
                cpf,
                email,
                password: hashedPassword,
                phone,
                dateOfBirth: new Date(dateOfBirth), 
                role,
                image,
                gender,
                familyContact,
                affiliation,
            },
        });

        res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário pelo email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Verifica se o usuário foi encontrado, se o papel corresponde e se a senha está correta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Gera um token JWT com o userId e role
        const token = jwt.sign(
            { userId: user.userId, role: user.role },
            config.secret,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/