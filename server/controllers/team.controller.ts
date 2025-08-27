import type { Request, Response } from "express";
import TeamMember from "../models/TeamMember.js";
import { toPublicUrl } from "../middleware/upload.js"; // ✅ helper we created

export const getAllTeamMembers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.json(teamMembers);
  } catch (error: any) {
    console.error("Get team members error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getTeamMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      res.status(404).json({ message: "Team member not found" });
      return;
    }
    res.json(teamMember);
  } catch (error: any) {
    console.error("Get team member error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const createTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role } = req.body;

    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = toPublicUrl(req.file.filename);
    }

    const teamMember = new TeamMember({
      name,
      role,
      image: imageUrl,
    });

    await teamMember.save();
    res.status(201).json(teamMember);
  } catch (error: any) {
    console.error("Create team member error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

export const updateTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role } = req.body;

    const updateData: any = { name, role };
    if (req.file) {
      updateData.image = toPublicUrl(req.file.filename);
    }

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      res.status(404).json({ message: "Team member not found" });
      return;
    }

    res.json(teamMember);
  } catch (error: any) {
    console.error("Update team member error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

export const deleteTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) {
      res.status(404).json({ message: "Team member not found" });
      return;
    }
    res.json({ message: "Team member deleted successfully" });
  } catch (error: any) {
    console.error("Delete team member error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
  