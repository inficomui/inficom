// import { Request, Response } from 'express';
// import Blog, { IBlog } from '../models/Blog';
import fs from "node:fs";
import path from "node:path";

import type { Request, Response } from "express";
import Blog from "../models/Blog.js";

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error: any) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.json(blog);
  } catch (error: any) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};


export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, author, date, comments, rating, desc, href, content } = req.body;

    // if a file was uploaded, build the public path; else fall back to body.image (optional)
    const imagePath =
      req.file ? `/uploads/${req.file.filename}` :
      (typeof req.body.image === 'string' ? req.body.image : undefined);

    const blog = await Blog.create({
      title,
      category,
      author,
      date,                                  
      comments: comments ? Number(comments) : 0,
      rating: rating ? Number(rating) : undefined,
      desc,
      href,
      image: imagePath,
      content,
    });

    res.status(201).json(blog);
  } catch (error: any) {
    console.error('Create blog error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};



export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      category,
      author,
      date,
      comments,
      rating,
      desc,
      href,
      image,          // optional string
      content,
      removeImage,    // flag "true" or true
    } = req.body as {
      title?: string;
      category?: string;
      author?: string;
      date?: string;
      comments?: string | number;
      rating?: string | number;
      desc?: string;
      href?: string;
      image?: string;
      content?: string;
      removeImage?: string | boolean;
    };

    // Fetch existing blog to know the current image path
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    const updates: Record<string, unknown> = {};

    if (typeof title !== "undefined") updates.title = title;
    if (typeof category !== "undefined") updates.category = category;
    if (typeof author !== "undefined") updates.author = author;
    if (typeof date !== "undefined") updates.date = date;
    if (typeof desc !== "undefined") updates.desc = desc;
    if (typeof href !== "undefined") updates.href = href;
    if (typeof content !== "undefined") updates.content = content;

    if (typeof comments !== "undefined") {
      const n = Number(comments);
      if (!Number.isNaN(n)) updates.comments = n;
    }
    if (typeof rating !== "undefined") {
      const n = Number(rating);
      if (!Number.isNaN(n)) updates.rating = n;
    }

    // Handle image replacement / deletion
    if (req.file) {
      // New file uploaded → delete old file (if any)
      if (existingBlog.image && existingBlog.image.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), existingBlog.image);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      updates.image = `/uploads/${req.file.filename}`;
    } else if (
      typeof removeImage !== "undefined" &&
      (removeImage === true || removeImage === "true")
    ) {
      // Explicitly remove → delete old file
      if (existingBlog.image && existingBlog.image.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), existingBlog.image);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete image:", err);
        });
      }
      updates.image = undefined; // clear DB field
    } else if (typeof image === "string" && image.trim() !== "") {
      updates.image = image.trim();
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(blog);
  } catch (error: any) {
    console.error("Update blog error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};


export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};