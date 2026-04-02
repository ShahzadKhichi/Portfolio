"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRepository = void 0;
const tsyringe_1 = require("tsyringe");
const Skill_Model_1 = __importDefault(require("../Models/Skill.Model"));
let SkillRepository = class SkillRepository {
    async getAllSkills() {
        return await Skill_Model_1.default.find().sort({ name: 1 });
    }
    async createSkill(data) {
        return await Skill_Model_1.default.create(data);
    }
    async updateSkill(id, data) {
        return await Skill_Model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteSkill(id) {
        return await Skill_Model_1.default.findByIdAndDelete(id);
    }
};
exports.SkillRepository = SkillRepository;
exports.SkillRepository = SkillRepository = __decorate([
    (0, tsyringe_1.injectable)()
], SkillRepository);
