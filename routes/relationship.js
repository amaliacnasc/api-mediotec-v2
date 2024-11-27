const express = require("express");
const router = express.Router();
const relationship = require('../controllers/userClassCourse'); 

router.post('/', relationship.createRelationship);
router.get('/user/:userId', relationship.getUserRelations);
router.get('/', relationship.getAllRelationships);
router.get('/:id', relationship.getRelationshipById);
router.put('/:id', relationship.updateRelationship);
router.get('/users', relationship.getRelationshipsGroupedByUser);
router.get('/courses', relationship.getRelationshipsGroupedByCourse);
router.get('/classes', relationship.getRelationshipsGroupedByClass);


module.exports = router;
