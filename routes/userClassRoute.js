const express = require("express");
const router = express.Router(); 
const UserClass = require('../controllers/userClassController'); 

// Definindo as rotas
router.post('/', UserClass.createUserClass); 
router.get('/', UserClass.getAllUserClass); 
router.get('/turma/:classId', UserClass.getAllUserClassByClassId); 
router.delete('/', UserClass.deleteUserClass); 

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: UserClasses
 *   description: Gerenciamento de turmas de usuários
 */

/**
 * @swagger
 * /mediotec/turmaUsuario:
 *   post:
 *     summary: Cadastrar um usuário em uma turma
 *     tags: [UserClasses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               classId:
 *                 type: string
 *                 description: ID da turma
 *     responses:
 *       201:
 *         description: Usuário cadastrado na turma com sucesso
 *       400:
 *         description: Erro ao cadastrar usuário na turma
 */

/**
 * @swagger
 * /mediotec/turmaUsuario:
 *   get:
 *     summary: Buscar todos os registros de usuários em turmas
 *     tags: [UserClasses]
 *     responses:
 *       200:
 *         description: Lista de registros de usuários em turmas
 *       400:
 *         description: Erro ao buscar registros
 */

/**
 * @swagger
 * /mediotec/turmaUsuario/turma/{classId}:
 *   get:
 *     summary: Buscar usuários cadastrados em uma turma específica
 *     tags: [UserClasses]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuários cadastrados na turma
 *       400:
 *         description: Erro ao buscar usuários por turma
 */

/**
 * @swagger
 * /mediotec/turmaUsuario:
 *   delete:
 *     summary: Remover um usuário de uma turma
 *     tags: [UserClasses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               classId:
 *                 type: string
 *                 description: ID da turma
 *     responses:
 *       200:
 *         description: Usuário removido da turma com sucesso
 *       500:
 *         description: Erro ao remover usuário da turma
 */
