const express = require("express");
const router = express.Router(); 
const User = require('../controllers/userController'); 

router.post('/', User.register);
router.get('/', User.getAllUsers); 
router.get('/:id', User.getUserById);
router.get('/name/:name', User.getUserByName); 
router.get('/role/:role', User.getUsersByType); 
router.put('/:id', User.updateUserById); 
router.delete('/delete/:id', User.deleteUserById); 

module.exports = router;