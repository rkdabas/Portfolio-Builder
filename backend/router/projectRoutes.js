import express from "express";
import {
  addNewProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getSingleProject,
} from "../controller/projectController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", addNewProject);
router.delete("/delete/:id", deleteProject);
router.put("/update/:id", updateProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

export default router;
