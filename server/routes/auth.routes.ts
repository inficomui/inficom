import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middleware/auth.js';


const authRoutes = express.Router();

authRoutes.post('/register', authController.register)
          .post('/login', authController.login)
          .get('/me', authenticateJWT, authController.getCurrentUser)
          .post('/logout', authController.logout)

export default authRoutes;