import { container } from "tsyringe";
import { TYPES } from "./interfaces/types";

// Repositories
import { MailRepository } from "./repositories/MailRepository";
container.register(TYPES.IMailRepository, { useClass: MailRepository });

// Utils / Senders
import { MailSenderUtility } from "./Utils/mailSender";
container.register(TYPES.IMailSender, { useClass: MailSenderUtility });

// Services
import { MailService } from "./services/MailService";
import { UserService } from "./services/UserService";
container.register(TYPES.IMailService, { useClass: MailService });
container.register(TYPES.IUserService, { useClass: UserService });

// Controllers
import { PublicController } from "./Controllers/public.controller";
import { UserController } from "./Controllers/user.controller";
container.register(TYPES.PublicController, { useClass: PublicController });
container.register(TYPES.UserController, { useClass: UserController });

// User Repository
import { UserRepository } from "./repositories/UserRepository";
container.register(TYPES.IUserRepository, { useClass: UserRepository });

// Project Repositories & Services
import { ProjectRepository } from "./repositories/ProjectRepository";
import { ProjectService } from "./services/ProjectService";
container.register(TYPES.IProjectRepository, { useClass: ProjectRepository });
container.register(TYPES.IProjectService, { useClass: ProjectService });

// Project Controller (Import only needed to verify types but resolve does it dynamically. We will just register it.)
import { ProjectController } from "./Controllers/project.controller";
container.register(TYPES.ProjectController, { useClass: ProjectController });

export { container };
