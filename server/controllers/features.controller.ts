import type { Request, Response } from "express";
import Feature from "../models/Feature.js";


export const getAllFeatures = async (req: Request, res: Response): Promise<void> => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.json(features);
  } catch (error: any) {
    console.error('Get features error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getFeatureById = async (req: Request, res: Response): Promise<void> => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      res.status(404).json({ message: 'Feature not found' });
      return;
    }
    res.json(feature);
  } catch (error: any) {
    console.error('Get feature error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const createFeature = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, desc, iconKey, color } = req.body;

    const feature = new Feature({
   
      title,
      desc,
      iconKey,
      color
    });

    await feature.save();
    res.status(201).json(feature);
  } catch (error: any) {
    console.error('Create feature error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

export const updateFeature = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, desc, iconKey, color } = req.body;

    const feature = await Feature.findByIdAndUpdate(
      req.params.id,
      { title, desc, iconKey, color },
      { new: true, runValidators: true }
    );

    if (!feature) {
      res.status(404).json({ message: 'Feature not found' });
      return;
    }

    res.json(feature);
  } catch (error: any) {
    console.error('Update feature error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

export const deleteFeature = async (req: Request, res: Response): Promise<void> => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) {
      res.status(404).json({ message: 'Feature not found' });
      return;
    }
    res.json({ message: 'Feature deleted successfully' });
  } catch (error: any) {
    console.error('Delete feature error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};