"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../container");
const types_1 = require("../interfaces/types");
const validateBody_1 = require("../Middlewares/validateBody");
const validator_1 = require("../Utils/Validators/validator");
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const multer_middleware_1 = require("../Middlewares/multer.middleware");
const router = (0, express_1.Router)();
const projectController = container_1.container.resolve(types_1.TYPES.ProjectController);
// Public Routes
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
// Protected Admin Routes
router.post("/", auth_middleware_1.authenticate, multer_middleware_1.uploadFile.single("image"), (0, validateBody_1.validateBody)(validator_1.projectSchema), projectController.createProject);
router.put("/:id", auth_middleware_1.authenticate, multer_middleware_1.uploadFile.single("image"), (0, validateBody_1.validateBody)(validator_1.projectSchema), projectController.updateProject);
router.delete("/:id", auth_middleware_1.authenticate, projectController.deleteProject);
exports.default = router;
