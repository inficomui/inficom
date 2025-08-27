// src/types/express.d.ts
import type { IUser } from '../models/User';

declare global {
  namespace Express {
    // Make Express' Request.user match your IUser shape
    interface User extends IUser {}
  }
}

export {};
