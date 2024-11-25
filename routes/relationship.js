const express = require("express");
const router = express.Router(); 
const relationship = require('../controllers/userClassCourse'); 

router.post('/', relationship.createRelationship);
router.get('/user/:userId', relationship.getUserRelations);

module.exports = router;