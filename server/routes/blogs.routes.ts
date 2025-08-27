import express from 'express';
import * as blogController  from '../controllers/blogs.controller.js';
import { authenticateJWT } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';


const blogsRoutes = express.Router();

blogsRoutes.get('/', blogController.getAllBlogs)
           .get('/:id', blogController.getBlogById)
           .post('/', authenticateJWT,upload.single('image'), blogController.createBlog)
           .put('/:id', authenticateJWT, upload.single('image'), blogController.updateBlog)
           .delete('/:id', authenticateJWT, blogController.deleteBlog);

export default blogsRoutes;