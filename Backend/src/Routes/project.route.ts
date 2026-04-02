import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { ProjectController } from "../Controllers/project.controller";
import { validateBody } from "../Middlewares/validateBody";
import { projectSchema } from "../Utils/Validators/validator";
import { authenticate } from "../Middlewares/auth.middleware";
import { uploadFile } from "../Middlewares/multer.middleware";

const router = Router();
const projectController = container.resolve<ProjectController>(TYPES.ProjectController);

// Public Routes
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);

// Protected Admin Routes
router.post("/", authenticate, uploadFile.single("image"), validateBody(projectSchema), projectController.createProject);
router.put("/:id", authenticate, uploadFile.single("image"), validateBody(projectSchema), projectController.updateProject);
router.delete("/:id", authenticate, projectController.deleteProject);

export default router;
