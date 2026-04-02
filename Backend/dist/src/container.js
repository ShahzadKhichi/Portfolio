"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const types_1 = require("./interfaces/types");
// Repositories
const MailRepository_1 = require("./repositories/MailRepository");
tsyringe_1.container.register(types_1.TYPES.IMailRepository, { useClass: MailRepository_1.MailRepository });
// Utils / Senders
const mailSender_1 = require("./Utils/mailSender");
tsyringe_1.container.register(types_1.TYPES.IMailSender, { useClass: mailSender_1.MailSenderUtility });
// Services
const MailService_1 = require("./services/MailService");
const UserService_1 = require("./services/UserService");
tsyringe_1.container.register(types_1.TYPES.IMailService, { useClass: MailService_1.MailService });
tsyringe_1.container.register(types_1.TYPES.IUserService, { useClass: UserService_1.UserService });
// Controllers
const public_controller_1 = require("./Controllers/public.controller");
const user_controller_1 = require("./Controllers/user.controller");
tsyringe_1.container.register(types_1.TYPES.PublicController, { useClass: public_controller_1.PublicController });
tsyringe_1.container.register(types_1.TYPES.UserController, { useClass: user_controller_1.UserController });
// User Repository
const UserRepository_1 = require("./repositories/UserRepository");
tsyringe_1.container.register(types_1.TYPES.IUserRepository, { useClass: UserRepository_1.UserRepository });
// Project Repositories & Services
const ProjectRepository_1 = require("./repositories/ProjectRepository");
const ProjectService_1 = require("./services/ProjectService");
tsyringe_1.container.register(types_1.TYPES.IProjectRepository, { useClass: ProjectRepository_1.ProjectRepository });
tsyringe_1.container.register(types_1.TYPES.IProjectService, { useClass: ProjectService_1.ProjectService });
// Project Controller (Import only needed to verify types but resolve does it dynamically. We will just register it.)
const project_controller_1 = require("./Controllers/project.controller");
tsyringe_1.container.register(types_1.TYPES.ProjectController, { useClass: project_controller_1.ProjectController });
