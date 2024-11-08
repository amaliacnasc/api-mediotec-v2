const express = require("express");
const router = express.Router(); 
const Course = require('../controllers/courseController'); 

router.post('/', Course.createCourse); 
router.get('/', Course.getAllCourses); 
router.get('/id/:courseId', Course.getCourseById); 
router.get('/nome/:courseName',Course.getCourseByName); 
router.get('/All', Course.getCoursesWithUsersAndClasses)
router.put('/courseupdate/:courseId', Course.updateCourseById); 
router.delete('/coursedelete/:courseId',Course.deleteCourseById); 

module.exports = router;

