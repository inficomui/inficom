import express from 'express';
import * as testimonalController from '../controllers/testimonials.controller.js';
import { authenticateJWT } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';


const testimonialsRoutes = express.Router();

testimonialsRoutes.get('/', testimonalController.getAllTestimonials)
                  .get('/:id',  testimonalController.getTestimonialById)
                  .post('/', authenticateJWT,upload.single('image'),   testimonalController.createTestimonial)
                  .put('/:id', authenticateJWT, upload.single('image'),  testimonalController.updateTestimonial)
                  .delete('/:id', authenticateJWT,  testimonalController.deleteTestimonial);

export default testimonialsRoutes;