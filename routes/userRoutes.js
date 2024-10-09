const express = require("express");
const router = express.Router(); 
const User = require('../controllers/userController'); 

router.post('/', User.createUser); 
router.get('/', User.getAllUsers); 
router.get('/:id', User.getUserById);
router.get('/name/:name', User.getUserByName); 
router.get('/role/:role', User.getUsersByType); 
router.put('/:id', User.updateUserById); 
router.delete('/delete/:id', User.deleteUserById); 

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /mediotec/usuarios:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               role:
 *                 type: string
 *                 description: Função do usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário
 */

/**
 * @swagger
 * /mediotec/usuarios:
 *   get:
 *     summary: Buscar todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       500:
 *         description: Erro ao buscar usuários
 */

/**
 * @swagger
 * /mediotec/usuarios/{id}:
 *   get:
 *     summary: Buscar usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */

/**
 * @swagger
 * /mediotec/usuarios/name/{name}:
 *   get:
 *     summary: Buscar usuário pelo nome
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nome do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */

/**
 * @swagger
 * /mediotec/usuarios/role/{role}:
 *   get:
 *     summary: Buscar usuários pelo tipo
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         description: Tipo do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuários encontrados
 *       404:
 *         description: Nenhum usuário encontrado
 *       500:
 *         description: Erro ao buscar usuários
 */

/**
 * @swagger
 * /mediotec/usuarios/{id}:
 *   put:
 *     summary: Atualizar um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               role:
 *                 type: string
 *                 description: Função do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */

/**
 * @swagger
 * /mediotec/usuarios/delete/{id}:
 *   delete:
 *     summary: Deletar um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
