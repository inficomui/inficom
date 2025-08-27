import  express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import { configurePassport } from './middleware/passport.js';
import authRoutes from './routes/auth.routes.js';
import featuresRoutes from './routes/features.routes.js';
import servicesRoutes from './routes/services.routes.js';
import testimonialsRoutes from './routes/testimonials.routes.js';
import teamRoutes from './routes/team.routes.js';
import blogsRoutes from './routes/blogs.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import type { NextFunction, Request, Response } from 'express';
import path from 'node:path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin:"http://localhost:3000",
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// Passport middleware
app.use(passport.initialize());
configurePassport(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/features', featuresRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/notifications', notificationRoutes);
// app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', ( req: Request, res:Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.use('/api/uploads', express.static(
  path.join(process.cwd(), 'uploads'),
  {
    setHeaders: (res) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      // Optional cache:
      // res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    },
  }
));
// Global error handler
app.use((err: any, req: Request, res:Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/inficom-admin')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });