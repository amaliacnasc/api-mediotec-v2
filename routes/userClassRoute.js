const express = require("express");
const router = express.Router(); 
const UserClass = require('../controllers/userClassController'); 

router.post('/', UserClass.createUserClass); 
router.get('/', UserClass.getAllUserClass); 
router.get('/turma/:classId', UserClass.getAllUserClassByClassId); 
router.delete('/', UserClass.deleteUserClass); 
// router.get('/:id', UserClass.getUserClassById);
// router.get('/name/:name', UserClass.getUserClassByName); 
// router.get('/role/:role', UserClass.getUserClasssByType); 
// router.put('/:id', UserClass.updateUserClassById); 
// router.delete('/delete/:id', UserClass.deleteUserClassById); 

module.exports = router;