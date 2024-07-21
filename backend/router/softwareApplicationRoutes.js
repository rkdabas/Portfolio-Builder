import express from "express";
import {
  addNewApplication,
  deleteApplication,
  getAllApplication,
} from "../controller/softwareApplicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", addNewApplication);
router.delete("/delete/:id", deleteApplication);
router.get("/getall", getAllApplication);

export default router;
