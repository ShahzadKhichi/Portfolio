import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { MessageController } from "../Controllers/message.controller";
import { authenticate } from "../Middlewares/auth.middleware";

const router = Router();
const messageController = container.resolve<MessageController>(TYPES.MessageController);

router.get("/", authenticate, messageController.getMessages);
router.delete("/:id", authenticate, messageController.deleteMessage);

export default router;
