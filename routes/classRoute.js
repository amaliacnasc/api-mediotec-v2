const express = require("express");
const router = express.Router(); 
const turma = require('../controllers/classController'); 

router.post('/', turma.createClass);
router.get('/', turma.getAllClasses); 
router.get('/id/:id', turma.getClassById); 
router.get('/year/:year', turma.getClassesByYear); 
router.put('/update/:id', turma.updateClassById); 
router.delete('/delete/:id', turma.deleteClassById); 

module.exports = router;