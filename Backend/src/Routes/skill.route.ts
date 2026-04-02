import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { SkillController } from "../Controllers/skill.controller";
import { authenticate } from "../Middlewares/auth.middleware";
import { validateBody } from "../Middlewares/validateBody";
import { skillSchema } from "../Utils/Validators/validator";

import { uploadFile } from "../Middlewares/multer.middleware";

const router = Router();
const skillController = container.resolve<SkillController>(TYPES.SkillController);

router.get("/", skillController.getAllSkills);
router.post("/", authenticate, uploadFile.single("icon"), validateBody(skillSchema), skillController.createSkill);
router.put("/:id", authenticate, uploadFile.single("icon"), validateBody(skillSchema), skillController.updateSkill);
router.delete("/:id", authenticate, skillController.deleteSkill);

export default router;
