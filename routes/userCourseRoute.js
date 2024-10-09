const express = require("express");
const router = express.Router(); 
const UserCourse = require('../controllers/userCourseController'); 

router.post('/', UserCourse.createUserCourse); 
router.get('/', UserCourse.getAllUserCourse); 
router.get('/disciplina/:courseId', UserCourse.getAllUserCourseByCourseId); 
router.delete('/', UserCourse.deleteUserCourse); 

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: UserCourses
 *   description: Gerenciamento de cursos de usuários
 */

/**
 * @swagger
 * /mediotec/usuarioDisc:
 *   post:
 *     summary: Cadastrar um usuário em um curso
 *     tags: [UserCourses]
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
 *               courseId:
 *                 type: string
 *                 description: ID do curso
 *     responses:
 *       201:
 *         description: Usuário cadastrado na turma com sucesso
 *       400:
 *         description: Erro ao cadastrar usuário no curso
 */

/**
 * @swagger
 * /mediotec/usuarioDisc:
 *   get:
 *     summary: Buscar todos os registros de usuários em cursos
 *     tags: [UserCourses]
 *     responses:
 *       200:
 *         description: Lista de registros de usuários em cursos
 *       400:
 *         description: Erro ao buscar registros
 */

/**
 * @swagger
 * /mediotec/usuarioDisc/disciplina/{courseId}:
 *   get:
 *     summary: Buscar usuários cadastrados em um curso específico
 *     tags: [UserCourses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID do curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuários cadastrados no curso
 *       400:
 *         description: Erro ao buscar usuários por curso
 */

/**
 * @swagger
 * /mediotec/usuarioDisc:
 *   delete:
 *     summary: Remover um usuário de um curso
 *     tags: [UserCourses]
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
 *               courseId:
 *                 type: string
 *                 description: ID do curso
 *     responses:
 *       200:
 *         description: Usuário removido da turma com sucesso
 *       500:
 *         description: Erro ao remover usuário do curso
 */
