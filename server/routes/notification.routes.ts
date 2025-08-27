import express from 'express';
import * as notificationController from '../controllers/notification.controller.js';
import { authenticateJWT } from '../middleware/auth.js';


const notificationRoutes = express.Router();

notificationRoutes.get('/', notificationController.getAllNotifications)
                  .get('/active', notificationController.getActiveNotification)
                  .get('/:id', notificationController.getNotificationById)
                  .post('/', authenticateJWT, notificationController.createNotification)
                  .put('/:id', authenticateJWT, notificationController.updateNotification)
                  .delete('/:id', authenticateJWT, notificationController.deleteNotification);

export default notificationRoutes;