// import express from 'express';
// import { upload } from '../middleware/upload';
// import { authenticateJWT } from '../middleware/auth';

// const router = express.Router();

// router.post('/image', authenticateJWT, upload.single('image'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Return Cloudinary URL
//     res.json({ 
//       url: (req.file as any).path,
//       public_id: (req.file as any).filename
//     });
//   } catch (error: any) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: error.message || 'Upload failed' });
//   }
// });

// export default router;