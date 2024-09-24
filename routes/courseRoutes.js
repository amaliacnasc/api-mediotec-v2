const express = require("express");
const router = express.Router(); 
const Course = require('../controllers/courseController'); 

router.post('/course', Course.createCourse); 
router.get('/courses', Course.getAllCourses); 
router.get('/course/:id', Course.getCourseById); 
router.get('/course/:courseName',Course.getCourseByName); 
router.get('/course/:courseClass',Course.getCourseByClass); 
router.get('/course/:userId', Course.getCoursebyUser); 
router.put('/courseupdate/:id', Course.updateCourseById); 
router.delete('/coursedelete/:id',Course.deleteCourseById); 

module.exports = router;

//as rotas estao com varios nomes porque todas estavam indo para get, tem que ter um nome diferente 