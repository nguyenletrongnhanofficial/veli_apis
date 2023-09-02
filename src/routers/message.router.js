import express from "express";
const router = express.Router();

import { MessageController } from "../controllers/message.controller.js";

router.post('/create', MessageController.create);
export default router;
