const express = require("express");
const router = express.Router(); 
const User = require('../controllers/userController'); 
const auth = require('../authMiddleware/authMiddleware'); // Corrigido

router.get('/', auth, User.getAllUsers); 
router.get('/:id', auth, User.getUserById);
router.get('/name/:name', auth, User.getUserByName); 
router.get('/role/:role', auth, User.getUsersByType); 
router.put('/:id', auth, User.updateUserById); 
router.delete('/delete/:id', auth, User.deleteUserById); 

module.exports = router;
