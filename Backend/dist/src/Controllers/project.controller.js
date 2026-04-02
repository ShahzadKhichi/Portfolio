"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
const cloudinary_1 = require("../Utils/cloudinary");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.createProject = async (req, res) => {
            try {
                let imageUrl = "";
                if (req.file) {
                    const uploadedUrl = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, req.file.mimetype);
                    if (uploadedUrl)
                        imageUrl = uploadedUrl;
                }
                else if (req.body.image) {
                    imageUrl = req.body.image;
                }
                const projectData = { ...req.body, image: imageUrl };
                const project = await this.projectService.createProject(projectData);
                res.status(201).json({ success: true, project });
            }
            catch (error) {
                console.error("Create Project Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.getAllProjects = async (req, res) => {
            try {
                const projects = await this.projectService.getAllProjects();
                res.status(200).json({ success: true, projects });
            }
            catch (error) {
                console.error("Get Projects Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.getProjectById = async (req, res) => {
            try {
                const id = req.params.id;
                const project = await this.projectService.getProjectById(id);
                if (!project) {
                    res.status(404).json({ message: "Project not found", success: false });
                    return;
                }
                res.status(200).json({ success: true, project });
            }
            catch (error) {
                console.error("Get Project Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.updateProject = async (req, res) => {
            try {
                const id = req.params.id;
                let updateData = { ...req.body };
                if (req.file) {
                    const uploadedUrl = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, req.file.mimetype);
                    if (uploadedUrl)
                        updateData.image = uploadedUrl;
                }
                const project = await this.projectService.updateProject(id, updateData);
                if (!project) {
                    res.status(404).json({ message: "Project not found", success: false });
                    return;
                }
                res.status(200).json({ success: true, project });
            }
            catch (error) {
                console.error("Update Project Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.deleteProject = async (req, res) => {
            try {
                const id = req.params.id;
                const project = await this.projectService.deleteProject(id);
                if (!project) {
                    res.status(404).json({ message: "Project not found", success: false });
                    return;
                }
                res.status(200).json({ success: true, message: "Project deleted successfully" });
            }
            catch (error) {
                console.error("Delete Project Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
    }
};
exports.ProjectController = ProjectController;
exports.ProjectController = ProjectController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.IProjectService)),
    __metadata("design:paramtypes", [Object])
], ProjectController);
