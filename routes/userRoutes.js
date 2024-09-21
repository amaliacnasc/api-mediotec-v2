const express = require("express");
const router = express.Router(); 
const User = require('../controllers/userController'); 

router.post('/', User.createUser); 
router.get('/', User.getAllUsers); 
router.get('/:id', User.getUserById);
router.get('/:name', User.getUserByName); 
router.get('/:role', User.getUsersByType); 
router.put('/:id', User.updateUserById); 
router.delete('/:id', User.updateUserById); 

module.exports = router;