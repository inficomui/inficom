// src/middleware/auth.ts
import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export const authenticateJWT: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JWTPayload;

    const userDoc = await User.findById(decoded.userId).select('-password');
    if (!userDoc) {
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }

    // Convert to plain object so it matches Express.User (IUser)
    req.user = userDoc.toObject() as Express.User;

    next();
  } catch {
    res.status(401).json({ message: 'Invalid token.' });
  }
};




