import express from "express";
import * as teamController from "../controllers/team.controller.js";
import { authenticateJWT } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const teamRoutes = express.Router();

teamRoutes
  .get("/", teamController.getAllTeamMembers)
  .get("/:id", teamController.getTeamMemberById)
  .post("/", authenticateJWT, upload.single("image"), teamController.createTeamMember)
  .put("/:id", authenticateJWT, upload.single("image"), teamController.updateTeamMember)
  .delete("/:id", authenticateJWT, teamController.deleteTeamMember);

export default teamRoutes;
