const express = require("express");
const router = express.Router(); 
const UserCourse = require('../controllers/userCourseController'); 


router.post('/',  UserCourse.createUserCourse); 
router.get('/',  UserCourse.getAllUserCourse); 
router.get('/disciplina/:courseId', UserCourse.getAllUserCourseByCourseId); 
router.delete('/', UserCourse.deleteUserCourse); 


module.exports = router;