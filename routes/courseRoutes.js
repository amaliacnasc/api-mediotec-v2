const express = require("express");
const router = express.Router(); 
const Course = require('../controllers/courseController'); 

router.post('/course', Course.createCourse); 
router.get('/courses', Course.getAllCourses); 
router.get('/course/:id', Course.getCourseById); 
router.get('/course/:courseName',Course.getCourseByName); 
router.get('/course/:courseClass',Course.getCourseByClass); 
router.get('/course/:userId', Course.getCoursebyUser); 
router.put('/course/:id', Course.updateCourseById); 
router.delete('/course/:id',Course.deleteCourseById); 

module.exports = router;
