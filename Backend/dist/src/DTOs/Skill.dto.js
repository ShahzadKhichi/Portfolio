"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillDTO = void 0;
class SkillDTO {
    static toResponse(skill) {
        return {
            _id: skill._id,
            name: skill.name,
            level: skill.level,
            category: skill.category,
            icon: skill.image.secureUrl,
        };
    }
    static toResponseList(skills) {
        return skills.map(skill => this.toResponse(skill));
    }
}
exports.SkillDTO = SkillDTO;
