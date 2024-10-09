const express = require("express");
const router = express.Router(); 
const UserClass = require('../controllers/userClassController'); 

router.post('/', UserClass.createUserClass); 
router.get('/', UserClass.getAllUserClass); 
router.get('/turma/:classId', UserClass.getAllUserClassByClassId); 
router.delete('/', UserClass.deleteUserClass); 


module.exports = router;