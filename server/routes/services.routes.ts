import express from 'express';

// import { authenticateJWT } from '../middleware/auth';
import * as servicesController from '../controllers/services.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const servicesRoutes = express.Router();

servicesRoutes.get('/', servicesController.getAllServices)
              .get('/:id', servicesController.getServiceById)
              .post('/', authenticateJWT, servicesController.createService)
              .put('/:id', authenticateJWT, servicesController.updateService)
              .delete('/:id', authenticateJWT, servicesController.deleteService)

export default servicesRoutes;