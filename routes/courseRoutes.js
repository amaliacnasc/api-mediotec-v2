const express = require("express");
const router = express.Router(); 
const Course = require('../controllers/courseController'); 

router.post('/', Course.createCourse); 
router.get('/', Course.getAllCourses); 
router.get('/:id', Course.getCourseById); 
router.get('/:courseName',Course.getCourseByName); 
router.get('/:courseClass',Course.getCourseByClass); 
router.get('/:userId', Course.getCoursebyUser); 
router.put('/courseupdate/:id', Course.updateCourseById); 
router.delete('/coursedelete/:id',Course.deleteCourseById); 

module.exports = router;

//as rotas estao com varios nomes porque todas estavam indo para get, tem que ter um nome diferente 