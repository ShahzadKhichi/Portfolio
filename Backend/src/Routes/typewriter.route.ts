import { Router } from "express";
import { container } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { TypewriterController } from "../Controllers/typewriter.controller";
import { authenticate } from "../Middlewares/auth.middleware";

const router = Router();
const typewriterController = container.resolve<TypewriterController>(TYPES.TypewriterController);

router.get("/", typewriterController.getAllTypewriters);
router.post("/", authenticate, typewriterController.createTypewriter);
router.put("/:id", authenticate, typewriterController.updateTypewriter);
router.delete("/:id", authenticate, typewriterController.deleteTypewriter);

export default router;
