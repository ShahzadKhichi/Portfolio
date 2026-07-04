import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { PublicController } from "../Controllers/public.controller";
import { mailLimiter } from "../Middlewares/rateLimiter";

const router = Router();
const publicController = container.resolve<PublicController>(TYPES.PublicController);

router.post("/sendMail", mailLimiter, publicController.sendMail);

export default router;
