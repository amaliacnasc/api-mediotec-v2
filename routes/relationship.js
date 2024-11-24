const express = require("express");
const router = express.Router(); 
const relationship = require('../controllers/userClassCourse'); 

router.post('/', relationship.createRelationship);

module.exports = router;