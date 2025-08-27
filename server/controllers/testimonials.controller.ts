import type { Request, Response } from "express";
import Testimonial from "../models/Testimonial.js";
// import Testimonial, { ITestimonial } from '../models/Testimonial';
import fs from 'node:fs';
import path from 'node:path';
export const getAllTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error: any) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }
    res.json(testimonial);
  } catch (error: any) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

function safeUnlink(filePathAbs: string) {
  fs.unlink(filePathAbs, (err) => {
    if (err) console.error('unlink error:', err.message);
  });
}
function isLocalUploadPath(p?: string): p is string {
  return !!p && p.startsWith('/uploads/');
}


export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const {  name, role, text, stars, size } = req.body as {
    
      name: string;
      role: string;
      text: string;
      stars?: string | number;
      size?: 'small' | 'large';
    };

    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : (typeof (req.body as any).image === 'string' ? (req.body as any).image : undefined);

    const doc = await Testimonial.create({

      name,
      role,
      text,
      image: imagePath,
      stars: typeof stars !== 'undefined' ? Number(stars) : undefined,
      size,
    });

    res.status(201).json(doc);
  } catch (error: any) {
    console.error('Create testimonial error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};


export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name, role, text, stars, size,
      image,            
      removeImage,      
    } = req.body as {
      name?: string;
      role?: string;
      text?: string;
      stars?: string | number;
      size?: 'small' | 'large';
      image?: string;
      removeImage?: string | boolean;
    };

    const existing = await Testimonial.findById(req.params.id);
    if (!existing) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }

    const updates: Record<string, unknown> = {};

    if (typeof name !== 'undefined') updates.name = name;
    if (typeof role !== 'undefined') updates.role = role;
    if (typeof text !== 'undefined') updates.text = text;
    if (typeof size !== 'undefined') updates.size = size;
    if (typeof stars !== 'undefined') {
      const n = Number(stars);
      if (!Number.isNaN(n)) updates.stars = n;
    }

    // Image handling
    if (req.file) {
    
      if (isLocalUploadPath(existing.image)) {
        const abs = path.join(process.cwd(), existing.image);
        safeUnlink(abs);
      }
      updates.image = `/uploads/${req.file.filename}`;
    } else if (removeImage === true || removeImage === 'true') {
      if (isLocalUploadPath(existing.image)) {
        const abs = path.join(process.cwd(), existing.image);
        safeUnlink(abs);
      }
      updates.image = undefined; 
    } else if (typeof image === 'string' && image.trim() !== '') {
      updates.image = image.trim();
    }
  

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error: any) {
    console.error('Update testimonial error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};


export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await Testimonial.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }
    if (isLocalUploadPath((doc as any).image)) {
      const abs = path.join(process.cwd(), (doc as any).image);
      safeUnlink(abs);
    }
    res.json({ message: 'Deleted' });
  } catch (error: any) {
    console.error('Delete testimonial error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};