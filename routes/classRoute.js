const express = require("express");
const router = express.Router(); 
const turma = require('../controllers/classController'); 

router.post('/', turma.createClass);
router.get('/', turma.getAllClasses); 
router.get('/id/:classId', turma.getClassById); 
router.get('/year/:year', turma.getClassesByYear); 
router.put('/update/:classId', turma.updateClassById); 
router.delete('/delete/:classId', turma.deleteClassById); 

module.exports = router;