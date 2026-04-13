import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { ProfileController } from "../Controllers/profile.controller";
import { authenticate } from "../Middlewares/auth.middleware";
import { validateBody } from "../Middlewares/validateBody";
import { profileSchema } from "../Utils/Validators/validator";
import { uploadFile } from "../Middlewares/multer.middleware";

const router = Router();
const profileController = container.resolve<ProfileController>(TYPES.ProfileController);

router.get("/", profileController.getProfile);
router.post("/views/increment", profileController.incrementViews);
router.put("/", authenticate, uploadFile.single("image"), validateBody(profileSchema), profileController.updateProfile);

export default router;
