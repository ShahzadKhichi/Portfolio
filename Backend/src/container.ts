import { container } from "tsyringe";
import { TYPES } from "./interfaces/types";

// Repositories
import { MailRepository } from "./repositories/MailRepository";
import { UserRepository } from "./repositories/UserRepository";
import { ProjectRepository } from "./repositories/ProjectRepository";
import { ProfileRepository } from "./repositories/ProfileRepository";
import { SkillRepository } from "./repositories/SkillRepository";
import { TypewriterRepository } from "./repositories/TypewriterRepository";

// Utils / Senders
import { MailSenderUtility } from "./Utils/mailSender";

// Services
import { MailService } from "./services/MailService";
import { UserService } from "./services/UserService";
import { ProjectService } from "./services/ProjectService";
import { ProfileService } from "./services/ProfileService";
import { SkillService } from "./services/SkillService";
import { MessageService } from "./services/MessageService";
import { TypewriterService } from "./services/TypewriterService";

// Controllers
import { PublicController } from "./Controllers/public.controller";
import { UserController } from "./Controllers/user.controller";
import { ProjectController } from "./Controllers/project.controller";
import { ProfileController } from "./Controllers/profile.controller";
import { SkillController } from "./Controllers/skill.controller";
import { MessageController } from "./Controllers/message.controller";
import { TypewriterController } from "./Controllers/typewriter.controller";

// Registration
container.register(TYPES.IMailRepository, { useClass: MailRepository });
container.register(TYPES.IMailSender, { useClass: MailSenderUtility });
container.register(TYPES.IMailService, { useClass: MailService });

container.register(TYPES.IUserRepository, { useClass: UserRepository });
container.register(TYPES.IUserService, { useClass: UserService });
container.register(TYPES.UserController, { useClass: UserController });

container.register(TYPES.IProjectRepository, { useClass: ProjectRepository });
container.register(TYPES.IProjectService, { useClass: ProjectService });
container.register(TYPES.ProjectController, { useClass: ProjectController });

container.register(TYPES.IProfileRepository, { useClass: ProfileRepository });
container.register(TYPES.IProfileService, { useClass: ProfileService });
container.register(TYPES.ProfileController, { useClass: ProfileController });

container.register(TYPES.ISkillRepository, { useClass: SkillRepository });
container.register(TYPES.ISkillService, { useClass: SkillService });
container.register(TYPES.SkillController, { useClass: SkillController });

container.register(TYPES.IMessageService, { useClass: MessageService });
container.register(TYPES.MessageController, { useClass: MessageController });

container.register(TYPES.ITypewriterRepository, { useClass: TypewriterRepository });
container.register(TYPES.ITypewriterService, { useClass: TypewriterService });
container.register(TYPES.TypewriterController, { useClass: TypewriterController });

container.register(TYPES.PublicController, { useClass: PublicController });

export { container };
