import type { Request, Response } from "express";
import Notification from "../models/Notification.js";
// import Notification, { INotification } from '../models/Notification';

export const getAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error: any) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getActiveNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findOne({ isActive: true });
    res.json(notification);
  } catch (error: any) {
    console.error('Get active notification error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getNotificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }
    res.json(notification);
  } catch (error: any) {
    console.error('Get notification error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, message, link, color, isActive } = req.body;

    // If creating an active notification, deactivate all others
    if (isActive) {
      await Notification.updateMany({}, { isActive: false });
    }

    const notification = new Notification({
      id,
      message,
      link,
      color,
      isActive
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error: any) {
    console.error('Create notification error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

export const updateNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, link, color, isActive } = req.body;

    // If activating this notification, deactivate all others
    if (isActive) {
      await Notification.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
    }

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { message, link, color, isActive },
      { new: true, runValidators: true }
    );

    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }

    res.json(notification);
  } catch (error: any) {
    console.error('Update notification error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }
    res.json({ message: 'Notification deleted successfully' });
  } catch (error: any) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};