const express = require("express");
const router = express.Router(); 
const User = require('../controllers/userController'); 
const auth = require('../authMiddleware/authMiddleware'); 

router.get('/', User.getAllUsers); 
router.get('/id/:userId', User.getUserById);
router.get('/name/:name', User.getUserByName); 
router.get('/email/:email',  User.getUserByEmail)
router.get('/role/:role', User.getUserByType); 
router.get('/class/:classId', User.getAllUsersOfClass) ; // busca todos os usuarios de uma turma 
router.get('/course/:courseId', User.getAllUsersOfCourse); // busca todos os usuarios de uma disciplina 
router.put('/update/:userId', User.updateUserById); 
router.delete('/delete/:userId', User.deleteUserById);
router.get('/student/:userId/courses', User.getAllCoursesOfStudent); // Busca disciplinas de um aluno
router.get('/student/:userId/course/:courseId/concepts', User.getConceptsByCourseAndStudent); // Busca conceitos de uma disciplina para um aluno
router.put('/concepts/:conceitoId', User.updateConcept);


module.exports = router;
