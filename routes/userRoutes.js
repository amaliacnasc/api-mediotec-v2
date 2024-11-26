const express = require("express");
const router = express.Router(); 
const User = require('../controllers/userController'); 
const auth = require('../authMiddleware/authMiddleware'); 

router.get('/', auth, User.getAllUsers); 
router.get('/id/:userId', User.getUserById);
router.get('/name/:name', auth, User.getUserByName); 
router.get('/email/:email',  User.getUserByEmail)
router.get('/role/:role', auth, User.getUserByType); 
router.get('/class/:classId', auth, User.getAllUsersOfClass) ; // busca todos os usuarios de uma turma 
router.get('/course/:courseId', auth, User.getAllUsersOfCourse); // busca todos os usuarios de uma disciplina 
router.put('/update/:userId', auth, User.updateUserById); 
router.delete('/delete/:userId', auth, User.deleteUserById); 

module.exports = router;
