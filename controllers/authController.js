const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Substitua por uma chave secreta segura e armazene-a no .env
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_supersegura';

// Função para registrar um novo usuário
exports.register = async (req, res) => {
    console.log('rodou 1 linha')
  try {
    const userData = {
        userName,
        cpf,
        email,
        password,
        phone,
        dateOfBirth,
        role,
        image,
        gender,
        familyContact,
        affiliation,
      } = req.body;
    console.log(userData)
    // Verifica se o usuário já existe pelo email ou CPF
    const existingUser = await prisma.user.findUnique({ where: { email } });
    const existingCPF = await prisma.user.findUnique({ where: { cpf } });

    if (existingUser || existingCPF) {
      return res.status(400).json({ message: 'Email ou CPF já cadastrado.' });
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        userName,
        cpf,
        email,
        password:hashedPassword,
        phone,
        dateOfBirth,
        role,
        image,
        gender,
        familyContact,
        affiliation,
      },
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: req.body });
  }
};

// Função para login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    // Compara a senha fornecida com a senha criptografada do banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};
