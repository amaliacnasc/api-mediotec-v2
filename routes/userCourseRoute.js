const express = require("express");
const router = express.Router(); 
const UserCourse = require('../controllers/userCourseController'); 

router.post('/', UserCourse.createUserCourse); 
router.get('/', UserCourse.getAllUserCourse); 
router.get('/disciplina/:courseId', UserCourse.getAllUserCourseByCourseId); 
router.delete('/', UserCourse.deleteUserCourse); 
// router.get('/:id', UserCourse.getUserCourseById);
// router.get('/name/:name', UserCourse.getUserCourseByName); 
// router.get('/role/:role', UserCourse.getUserCoursesByType); 
// router.put('/:id', UserCourse.updateUserCourseById); 
// router.delete('/delete/:id', UserCourse.deleteUserCourseById); 

module.exports = router;