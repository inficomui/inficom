import express from 'express';

// import { authenticateJWT } from '../middleware/auth';
import * as featuresController from '../controllers/features.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const featuresRoutes = express.Router();

featuresRoutes.get('/', featuresController.getAllFeatures)
              .get('/:id', featuresController.getFeatureById)
              .post('/', authenticateJWT, featuresController.createFeature)
              .put('/:id', authenticateJWT, featuresController.updateFeature)
              .delete('/:id', authenticateJWT, featuresController.deleteFeature)

export default featuresRoutes;