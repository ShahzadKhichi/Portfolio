"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const types_1 = require("./interfaces/types");
// Repositories
const MailRepository_1 = require("./repositories/MailRepository");
const UserRepository_1 = require("./repositories/UserRepository");
const ProjectRepository_1 = require("./repositories/ProjectRepository");
const ProfileRepository_1 = require("./repositories/ProfileRepository");
const SkillRepository_1 = require("./repositories/SkillRepository");
// Utils / Senders
const mailSender_1 = require("./Utils/mailSender");
// Services
const MailService_1 = require("./services/MailService");
const UserService_1 = require("./services/UserService");
const ProjectService_1 = require("./services/ProjectService");
const ProfileService_1 = require("./services/ProfileService");
const SkillService_1 = require("./services/SkillService");
const MessageService_1 = require("./services/MessageService");
// Controllers
const public_controller_1 = require("./Controllers/public.controller");
const user_controller_1 = require("./Controllers/user.controller");
const project_controller_1 = require("./Controllers/project.controller");
const profile_controller_1 = require("./Controllers/profile.controller");
const skill_controller_1 = require("./Controllers/skill.controller");
const message_controller_1 = require("./Controllers/message.controller");
// Registration
tsyringe_1.container.register(types_1.TYPES.IMailRepository, { useClass: MailRepository_1.MailRepository });
tsyringe_1.container.register(types_1.TYPES.IMailSender, { useClass: mailSender_1.MailSenderUtility });
tsyringe_1.container.register(types_1.TYPES.IMailService, { useClass: MailService_1.MailService });
tsyringe_1.container.register(types_1.TYPES.IUserRepository, { useClass: UserRepository_1.UserRepository });
tsyringe_1.container.register(types_1.TYPES.IUserService, { useClass: UserService_1.UserService });
tsyringe_1.container.register(types_1.TYPES.UserController, { useClass: user_controller_1.UserController });
tsyringe_1.container.register(types_1.TYPES.IProjectRepository, { useClass: ProjectRepository_1.ProjectRepository });
tsyringe_1.container.register(types_1.TYPES.IProjectService, { useClass: ProjectService_1.ProjectService });
tsyringe_1.container.register(types_1.TYPES.ProjectController, { useClass: project_controller_1.ProjectController });
tsyringe_1.container.register(types_1.TYPES.IProfileRepository, { useClass: ProfileRepository_1.ProfileRepository });
tsyringe_1.container.register(types_1.TYPES.IProfileService, { useClass: ProfileService_1.ProfileService });
tsyringe_1.container.register(types_1.TYPES.ProfileController, { useClass: profile_controller_1.ProfileController });
tsyringe_1.container.register(types_1.TYPES.ISkillRepository, { useClass: SkillRepository_1.SkillRepository });
tsyringe_1.container.register(types_1.TYPES.ISkillService, { useClass: SkillService_1.SkillService });
tsyringe_1.container.register(types_1.TYPES.SkillController, { useClass: skill_controller_1.SkillController });
tsyringe_1.container.register(types_1.TYPES.IMessageService, { useClass: MessageService_1.MessageService });
tsyringe_1.container.register(types_1.TYPES.MessageController, { useClass: message_controller_1.MessageController });
tsyringe_1.container.register(types_1.TYPES.PublicController, { useClass: public_controller_1.PublicController });
