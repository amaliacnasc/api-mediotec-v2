const express = require("express");
const router = express.Router(); 
const turma = require('../controllers/classController'); 

router.post('/turma', turma.createClass);
router.get('/turmas', turma.getAllClasses); 
router.get('/turma/:id', turma.getClassById); 
router.get('/turma/:year', turma.getClassesByYear); 
router.put('/turma/:id', turma.updateClassById); 
router.put('/turma/:id', turma.deleteClassById); 

module.exports = router;