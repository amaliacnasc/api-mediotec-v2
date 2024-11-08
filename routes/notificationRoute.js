const express = require("express");
const router = express.Router(); 
const notifications = require('../controllers/notificationController'); 

router.post('/', notifications.createNotification); 
router.get('/', notifications.getAllNotifications);
router.get('/notification/:title', notifications.getNotificationByTitle);
router.get('/notification/id/:announcementId', notifications.getNotificationById);
router.get('/notification/:type' , notifications.getNotificationsByType); 
router.get('/notification/:userId', notifications.getNotificationsByUser);
router.put('/notification/:announcementId', notifications.updateNotificationById); 
router.delete('/notification/:announcementId', notifications.deleteNotificationById); 

module.exports = router;