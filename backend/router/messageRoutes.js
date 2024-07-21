import express from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getAllMessages", getAllMessages);
router.delete("/delete/:id", deleteMessage); // only admin can delete a message so checking for authentication first, is he is admin only then message can be deleted

export default router;
