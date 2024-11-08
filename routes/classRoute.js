const express = require("express");
const router = express.Router(); 
const turma = require('../controllers/classController'); 

router.post('/', turma.createClass);
router.get('/', turma.getAllClasses); 
router.get('/id/:classId', turma.getClassById); 
router.get('/className/:className', turma.getClassByName); 
router.get('/year/:year', turma.getClassesByYear); 
router.get('/classCourse/:classId', turma.getAllCoursesOfClassId); // Busca todas as disciplinas de uma turma 
router.get('/classUser/:userId', turma.getAllClassesOfUserId);// busca todas as turmas de um usuario (professor) 
router.get('/classwithoutCourse', turma.getClassesWithoutCourses); // busca todas as turmas sem disciplinas cadastradas 
router.put('/update/:classId', turma.updateClassById); 
router.delete('/delete/:classId', turma.deleteClassById); 

module.exports = router;