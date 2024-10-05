const express = require("express");
const router = express.Router(); 
const turmaDisciplina = require('../controllers/classCourseController'); 

router.post('/', turmaDisciplina.createClassCourse); 
router.get('/', turmaDisciplina.getAllClassCourse); 
router.get('/turmaDisciplina/:classId', turmaDisciplina.getAllclassCourseById); 
router.delete('/', turmaDisciplina.deleteclassCourse); 

module.exports = router;