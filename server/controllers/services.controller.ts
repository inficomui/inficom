import type { Request, Response } from "express";
import Service from "../models/Service.js";
// import Service, { IService } from '../models/Service';

export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error: any) {
    console.error('Get services error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.json(service);
  } catch (error: any) {
    console.error('Get service error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 

      title, 
      iconKey, 
      description, 
      details, 
      extraDescription, 
      features, 
      included, 
      notIncluded, 
      terms, 
      faqs 
    } = req.body;

    const service = new Service({

      title,
      iconKey,
      description,
      details,
      extraDescription,
      features,
      included,
      notIncluded,
      terms,
      faqs
    });

    await service.save();
    res.status(201).json(service);
  } catch (error: any) {
    console.error('Create service error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      title, 
      iconKey, 
      description, 
      details, 
      extraDescription, 
      features, 
      included, 
      notIncluded, 
      terms, 
      faqs 
    } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        iconKey, 
        description, 
        details, 
        extraDescription, 
        features, 
        included, 
        notIncluded, 
        terms, 
        faqs 
      },
      { new: true, runValidators: true }
    );

    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    res.json(service);
  } catch (error: any) {
    console.error('Update service error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};