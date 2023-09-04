import express from "express";
const router = express.Router();

import { ConversationController } from "../controllers/conversation.controller.js";

router.post('/create', ConversationController.create);
router.get('/get/:userId',ConversationController.getUserConversation )
router.get('/get-message/:conversationId', ConversationController.getConversationMessage)

export default router;